from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "IoT Backend API"
    environment: str = "dev"
    cors_origins: str = "http://localhost:3000"
    database_url: str = "sqlite:///./dev.db"


settings = Settings()

