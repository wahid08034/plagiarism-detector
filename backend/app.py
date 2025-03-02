from flask import Flask, request, jsonify
import difflib
import requests

app = Flask(__name__)

# Plagiarism detection using similarity ratio
def check_plagiarism(text1, text2):
    return difflib.SequenceMatcher(None, text1, text2).ratio() * 100

# AI-generated text detection using Open Source API
def detect_ai_text(text):
    response = requests.post("https://openai-detector-api.com/check", json={"text": text})
    return response.json().get("ai_generated", "Unknown")

@app.route('/check', methods=['POST'])
def check_text():
    data = request.json
    text1 = data.get("text1", "")
    text2 = data.get("text2", "")

    plagiarism_score = check_plagiarism(text1, text2)
    ai_result = detect_ai_text(text1)

    return jsonify({
        "plagiarism_score": plagiarism_score,
        "ai_generated": ai_result
    })

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
