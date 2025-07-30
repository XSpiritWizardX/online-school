from flask.cli import AppGroup

from app.seeds.users import seed_users, unseed_users

# import other seeds here

# adds info to `uv run flask seed --help`
seed_commands = AppGroup("seed")


# creates `uv run flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    # add other seeders here


# creates `uv run flask seed undo` command
@seed_commands.command("undo")
def undo():
    unseed_users()
    # add other seed undoers here
