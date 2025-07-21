from dotenv import dotenv_values
from pathlib import Path
import os
import sys


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


def get_flask_env():
    if "FLASK_ENV" in os.environ:
        return os.environ["FLASK_ENV"]
    env_files = [".env", ".flaskenv"]
    for env_file in env_files:
        env_path = Path(env_file)
        if not env_path.exists():
            continue
        env = dotenv_values(env_path)
        if "FLASK_ENV" in env:
            return env["FLASK_ENV"]


mode = get_flask_env()
if not mode:
    print(__file__, file=sys.stderr)
    print("unable to determine mode", file=sys.stderr)
    print('set FLASK_ENV="development" in .env', file=sys.stderr)
    exit(1)
front_port = get_front_port(mode)


class Config:
    PORT = int(os.environ.get("FLASK_RUN_PORT", 5002))
    SECRET_KEY = os.environ.get("SECRET_KEY")
    FRONT_PORT = front_port


class DevelopmentConfig(Config):
    DEBUG = True
    PORT = int(os.environ.get("FLASK_RUN_PORT", 5003))


class ProductionConfig(Config):
    DEBUG = False
    PORT = int(os.environ.get("FLASK_RUN_PORT", 8000))
