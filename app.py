from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/", methods=["GET"])
def home():
    return "Backend is working!"

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    # Dummy login check
    if username == "admin" and password == "admin":
        return jsonify({"status": "success", "message": "Login successful"})
    return jsonify({"status": "fail", "message": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
