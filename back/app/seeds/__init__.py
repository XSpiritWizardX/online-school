from flask.cli import AppGroup

from app.seeds.users import seed_users, unseed_users
from app.seeds.courses import seed_courses, unseed_courses
# import other seeds here

# adds info to `uv run flask seed --help`
seed_commands = AppGroup("seed")


# creates `uv run flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_courses()
    # add other seeders here


# creates `uv run flask seed undo` command
@seed_commands.command("undo")
def undo():
    unseed_courses()
    unseed_users()
    # add other seed undoers here
