# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key = os.getenv('OPENAI_API_KEY'),
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/ask', methods=['POST'])
def ask_llm():
    data = request.json
    context = data.get('context', '')
    prompt = data.get('prompt', '')

    try:
        response = client.completions.create(model="gpt-3.5-turbo",
        prompt=f"{context}\n\n{prompt}",
        max_tokens=150,
        temperature=0.7)
        text = response.choices[0].text.strip()
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
