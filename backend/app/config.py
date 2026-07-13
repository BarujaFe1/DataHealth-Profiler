from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    app_name: str = "DataHealth Profiler API"
    app_version: str = "1.0.0"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    max_upload_mb: int = 10
    max_rows: int = 50_000
    preview_rows: int = 20
    data_dir: str = "../data"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def max_upload_bytes(self) -> int:
        return self.max_upload_mb * 1024 * 1024


@lru_cache
def get_settings() -> Settings:
    return Settings()
