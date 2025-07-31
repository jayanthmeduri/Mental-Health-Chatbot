import os
import re
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import google.generativeai as genai
import os

# Delete the old file if it exists
if os.path.exists("summary_report.txt"):
    os.remove("summary_report.txt")

# Load environment variables (Google API key)
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Read the conversation history from cache.txt
with open("cache.txt", "r", encoding="utf-8") as file:
    chat_history = file.read()

# Clean the chat by removing timestamps like [00:00] or [00:00:00]
cleaned_chat = re.sub(r"\[\d{2}:\d{2}(:\d{2})?\]", "", chat_history)

# Define a structured prompt for mental health summary
prompt_template = PromptTemplate.from_template("""
You are a professional mental health assistant. Based on the following conversation between a patient and the chatbot, generate a detailed summary report that includes:

- Overview of the patient's emotional state
- Specific concerns or symptoms mentioned
- Patterns in behavior or language
- Any notable improvements or regressions
- Suggested areas for further support

Conversation:
{chat}

Summary Report:
""")

# Initialize the Gemini model
model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

# Create a chain with the prompt and the model
chain = prompt_template | model

# Generate the summary
summary = chain.invoke({"chat": cleaned_chat})

# Write the summary to a text file
with open("summary_report.txt", "w", encoding="utf-8") as f:
    f.write(str(summary))

print("✅ Summary report generated successfully.")
