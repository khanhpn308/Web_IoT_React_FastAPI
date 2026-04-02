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

    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 7

    # MQTT subscriber (Mosquitto)
    mqtt_enabled: bool = True
    mqtt_host: str = "localhost"
    mqtt_port: int = 1883
    mqtt_username: str | None = None
    mqtt_password: str | None = None
    mqtt_client_id: str = "iot-backend-subscriber"
    mqtt_keepalive: int = 60
    # Comma-separated list; you will edit later
    mqtt_topics: str = "test/topic1,test/topic2"
    mqtt_qos: int = 0
    mqtt_max_messages: int = 500


settings = Settings()

