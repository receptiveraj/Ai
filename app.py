from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = {}
students = []

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    if username in users:
        return jsonify({"success": False, "message": "Username already exists."})
    users[username] = password
    return jsonify({"success": True, "message": "Signup successful."})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data["username"]
    password = data["password"]

    if users.get(username) == password:
        return jsonify({"success": True, "message": "Login successful."})
    return jsonify({"success": False, "message": "Invalid credentials."})

@app.route("/students", methods=["POST"])
def add_student():
    data = request.get_json()
    students.append(data)
    return jsonify({"success": True, "message": "Student added."})

@app.route("/students", methods=["GET"])
def get_students():
    return jsonify(students)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
