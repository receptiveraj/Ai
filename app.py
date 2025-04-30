from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory user store (for demo)
users = {}

@app.route("/")
def home():
    return "School CRM Backend is running!"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password are required"}), 400

    if username in users:
        return jsonify({"status": "error", "message": "User already exists"}), 409

    users[username] = password
    return jsonify({"status": "success", "message": "Signup successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password are required"}), 400

    if users.get(username) == password:
        return jsonify({"status": "success", "message": "Login successful"}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8080)
