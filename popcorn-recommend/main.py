from flask import Flask, request, jsonify

from model import RecommendModel

app = Flask(__name__)
model = RecommendModel()

@app.route("/api/recommend", methods=['POST'])
def get_recommend():
    data = request.json
    results = model.find_near_movie(data)
    return jsonify(results)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8888)