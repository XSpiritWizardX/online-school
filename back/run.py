from app import create_app

app = create_app()

if __name__ == "__main__":
    port = app.config.get("PORT", 5000)
    app.run(debug=True, port=port)
