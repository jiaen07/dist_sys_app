from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

# Connection string using asyncpg driver
HOST = "localhost"
PORT = "5432"
USER = "postgres"
PASSWORD = "123"
DATABASE = "campus"

# Note the change to +asyncpg
SQLALCHEMY_DATABASE_URL = os.environ["DATABASE_URL"]


# Create Async Engine
engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False,
    future=True
)

# Async Session Factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
