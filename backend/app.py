# backend/app.py
from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/api/ask', methods=['POST'])
def ask_llm():
    data = request.json
    context = data.get('context', '')
    prompt = data.get('prompt', '')

    try:
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"{context}\n\n{prompt}",
            max_tokens=150,
            temperature=0.7,
        )
        text = response.choices[0].text.strip()
        return jsonify({'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
