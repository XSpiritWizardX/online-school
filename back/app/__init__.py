from flask import Flask, request, jsonify
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    get_jwt_identity,
)
import bcrypt
from datetime import timedelta

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "your-secret-key-change-this-in-production"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

# Simple in-memory user store (use a real database in production)
users = {
    "admin": bcrypt.hashpw("password".encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    ),
    "user": bcrypt.hashpw("123456".encode("utf-8"), bcrypt.gensalt()).decode("utf-8"),
}


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    if username not in users:
        return jsonify({"message": "Invalid credentials"}), 401

    if not bcrypt.checkpw(password.encode("utf-8"), users[username].encode("utf-8")):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token})


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello {current_user}! This is a protected route."})


@app.route("/register", methods=["POST"])
def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    if username in users:
        return jsonify({"message": "Username already exists"}), 409

    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )
    users[username] = hashed_password

    return jsonify({"message": "User created successfully"}), 201


@app.route("/")
def home():
    return jsonify(
        {
            "message": "Flask JWT Auth API",
            "endpoints": {
                "POST /register": "Create a new user",
                "POST /login": "Login and get JWT token",
                "GET /protected": "Access protected route (requires JWT token)",
            },
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
