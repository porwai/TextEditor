# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

openai.api_key = os.getenv('OPENAI_API_KEY')

client = OpenAI(
    api_key=openai.api_key,
)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/api/ask', methods=['POST'])
def ask_llm():
    data = request.json
    context = data.get('context', '')
    prompt = data.get('prompt', '')

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": context},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7,
        )
        text = response.choices[0].message['content'].strip()
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
