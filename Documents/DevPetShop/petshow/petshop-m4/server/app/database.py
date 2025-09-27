from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    db_user: str
    db_password: str
    db_host: str
    db_database: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()

DATABASE_URL = f"mysql+mysqlconnector://{settings.db_user}:{settings.db_password}@{settings.db_host}/{settings.db_database}"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def create_db_and_tables():
    Base.metadata.create_all(engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
