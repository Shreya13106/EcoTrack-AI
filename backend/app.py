from flask import Flask, request, jsonify
from flask_cors import CORS

from carbon_calculator import calculate_carbon_footprint
from ai_engine import get_ai_response

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {
        "message": "EcoTrack AI Backend Running"
    }

@app.route("/calculate", methods=["POST"])
def calculate():

    data = request.json

    result = calculate_carbon_footprint(data)

    return jsonify(result)

@app.route("/ai", methods=["POST"])
def ai_chat():

    data = request.json

    user_message = data.get("message")

    ai_response = get_ai_response(user_message)

    return jsonify({
        "response": ai_response
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
