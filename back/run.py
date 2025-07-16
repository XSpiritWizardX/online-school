from app import create_app

app = create_app()

if __name__ == "__main__":
    port = app.config.get("PORT", 5000)
    debug = app.config.get("FLASK_DEBUG", True)
    if debug.lower() in ["0", "false", ""]:
        debug = False
    else:
        debug = True
    app.run(debug=debug, port=port)
