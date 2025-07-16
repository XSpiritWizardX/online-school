from dotenv import dotenv_values
from pathlib import Path
import os


def load_front_config(mode):
    """
    load environment files in vite order
    settings in later files override settings in earlier files
    """

    backend_dir = Path(__file__).parent.parent / "front"

    env_files = [
        ".env",
        ".env.local",
        f".env.{mode}",
        f".env.{mode}.local",
    ]

    config = {}

    for env_file in env_files:
        env_path = backend_dir / env_file
        if env_path.exists():
            print(f"loading {env_file}")
            config.update(dotenv_values(env_path))

    return config


def get_front_port(mode):
    front_config = load_front_config(mode)
    if "PORT" not in front_config:
        print("unable to determine front port")
        exit(1)
    return front_config["PORT"]


if "FLASK_ENV" not in os.environ:
    print("unable to determine environment mode")
    exit(1)

mode = os.environ.get("FLASK_ENV")
front_port = get_front_port(mode)


class Config:
    PORT = int(os.environ.get("FLASK_RUN_PORT", 5002))
    FRONT_PORT = front_port


class DevelopmentConfig(Config):
    DEBUG = True
    PORT = int(os.environ.get("FLASK_RUN_PORT", 5003))


class ProductionConfig(Config):
    DEBUG = False
    PORT = int(os.environ.get("FLASK_RUN_PORT", 8000))
