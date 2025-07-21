from app import create_app
from app.db import db
from app.seeds.users import seed_users, undo_users

app = create_app()


@app.cli.command()
def seed():
    """seed db"""
    with app.app_context():
        db.create_all()
        seed_users()
        print("db seeded")


@app.cli.command()
def unseed():
    """undo seeds"""
    with app.app_context():
        undo_users()
        print("seeds undone")


if __name__ == "__main__":
    port = app.config.get("PORT", 5000)
    debug = app.config.get("FLASK_DEBUG", True)
    if debug.lower() in ["0", "false", ""]:
        debug = False
    else:
        debug = True
    app.run(debug=debug, port=port)
