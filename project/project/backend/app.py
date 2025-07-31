from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from datetime import datetime
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
import google.generativeai as genai

# Load API key
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Gemini
model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

# File paths
CACHE_FILE = "cache.txt"

MENTAL_HEALTH_PROMPT = """You are a compassionate and supportive Mental Health Assistant named Gemini.
Your job is to provide empathetic, non-judgmental responses to users who may be struggling emotionally.
You are not a replacement for therapy, but you can offer emotional support, self-care suggestions,
and gently encourage users to seek professional help when needed.
Always respond kindly, with understanding and emotional intelligence.
"""

# Max characters in context to prevent bloating
MAX_CACHE_LENGTH = 3000

# Create cache file with a clean header
if os.path.exists(CACHE_FILE):
    os.remove(CACHE_FILE)

with open(CACHE_FILE, "w", encoding="utf-8") as f_out:
    f_out.write("==== Chat Log Start ====\n")

# Load cache
with open(CACHE_FILE, "r", encoding="utf-8") as f:
    cached_context = f.read()

# Flask app setup
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    global cached_context

    data = request.get_json()
    user_input = data.get("message", "")
    session_id = data.get("session_id", "default")  # Future use

    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    # Limit cache length to avoid overly long prompts
    if len(cached_context) > MAX_CACHE_LENGTH:
        cached_context = cached_context[-MAX_CACHE_LENGTH:]

    # Compose full prompt
    full_prompt = MENTAL_HEALTH_PROMPT + cached_context + f"\nUser: {user_input}\nGemini:"
    response = model.invoke(full_prompt)
    reply = response.content.strip().split('\n')[:3]
    final_reply = '\n'.join(reply)

    # Add timestamp for tracking
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"\n[{timestamp}]\nUser: {user_input}\nGemini: {final_reply}"

    # Update cache string and file
    cached_context += log_entry
    with open(CACHE_FILE, "a", encoding="utf-8") as file:
        file.write(log_entry)

    return jsonify({
        "response": final_reply,
        "session_id": session_id
    })


@app.route('/generate-report', methods=['POST'])
def generate_report():
    import subprocess
    import os
    subprocess.run(["python", os.path.abspath(r"project/project/backend/generate_report.py")], check=True)


    return jsonify({"status": "success", "message": "Report generated."})

@app.route('/latest-report', methods=['GET'])
def get_latest_report():
    try:
        report_path = r"C:\Users\jayan\projects\mental health\summary_report.txt"
        if os.path.exists(report_path):
            return send_file(report_path, mimetype='text/plain')
        else:
            return "Report not found", 404
    except Exception as e:
        return f"An error occurred: {str(e)}", 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
