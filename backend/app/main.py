import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import FileResponse 
from src.infrastructure.database import engine, Base
from .logging import LoggingMiddleware
from .security import SecurityMiddleware
from api.routers import student, driver, bus, taxi, bicycle

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title="Campus Ride API", 
    version="0.2.0",
    lifespan=lifespan,
    docs_url=None, 
    redoc_url=None
)

# Add Middlewares
app.add_middleware(LoggingMiddleware)
app.add_middleware(SecurityMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Path Safe Local Static File Routers ---

# This dynamically figures out exactly where the current file is running
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/static/swagger-ui-bundle.js", include_in_schema=False)
async def get_swagger_js():
    # If main.py is inside /app, this looks for /app/swagger-ui-bundle.js
    js_path = os.path.join(BASE_DIR, "swagger-ui-bundle.js")
    return FileResponse(js_path)

@app.get("/static/swagger-ui.css", include_in_schema=False)
async def get_swagger_css():
    # If main.py is inside /app, this looks for /app/swagger-ui.css
    css_path = os.path.join(BASE_DIR, "swagger-ui.css")
    return FileResponse(css_path)


# Custom route linking directly to our absolute asset paths
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="/static/swagger-ui-bundle.js",   
        swagger_css_url="/static/swagger-ui.css",     
    )

# Include Transit Routers
app.include_router(student.router, prefix="/api/v1")
app.include_router(driver.router, prefix="/api/v1")
app.include_router(bus.router, prefix="/api/v1")
app.include_router(taxi.router, prefix="/api/v1")
app.include_router(bicycle.router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ok", "database": "connected"}