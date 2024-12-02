# api/index.py
from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/index", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, Vercel!222"})
