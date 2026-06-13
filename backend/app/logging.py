import time
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from src.telemetry.logger import log_osi_trace

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # --- L7 Application Layer ---
        log_osi_trace(7, "API_REQUEST_IN", f"Method: {request.method} | Path: {request.url.path}")
        
        # --- L6 Presentation Layer (PDU Info) ---
        # Note: In a real distributed system, we'd check MTU here (Slide 4.1)
        content_length = request.headers.get("content-length", "0")
        log_osi_trace(6, "DE-ENCAPSULATION", f"Received Data PDU (Size: {content_length} bytes)")

        # Prepare for response
        response: Response = await call_next(request)
        
        # --- L4/5 Transport & Session Layer ---
        process_time = (time.time() - start_time) * 1000
        formatted_process_time = "{0:.2f}".format(process_time)
        
        log_osi_trace(4, "SEGMENT_COMPLETE", f"Total RTT (Processing): {formatted_process_time}ms | Status: {response.status_code}")
        
        # Add custom header for performance monitoring (Slide 5.2)
        response.headers["X-Process-Time"] = formatted_process_time
        return response