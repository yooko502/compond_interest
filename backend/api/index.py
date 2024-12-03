# api/index.py
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

@app.route("/api/final_balance", methods=["POST"])
def get_final_balance():
    json_data = request.get_json() 
    response = jsonify({"message": json_data})
    return response
