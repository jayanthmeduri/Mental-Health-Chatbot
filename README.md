# 🧠 AI-Powered Mental Health Chatbot

This is an **AI-powered Mental Health Support Web App** that provides users with empathetic conversations, emotional analysis, and personalized wellness reports. It combines open-source NLP models, emotion detection, and user-friendly interfaces to support mental well-being.

## 🌟 Features

- 💬 **Chatbot Support** using `tanusrich/Mental_Health_Chatbot` from Hugging Face.
- 📈 **Emotion Detection Graphs** powered by `boltuix/bert-emotion`.
- 📄 **Dynamic Report Generation** using `gemmini-2.0-flask`.
- 🔐 **Secure Login System** with Firebase Authentication.
- 🔁 **Real-time Chat and Response** with user-friendly interface.
- 🧘‍♀️ **Supportive Feedback** for mental wellness improvement.

## 🧠 Tech Stack

| Component        | Tech Used                            |
|------------------|--------------------------------------|
| Frontend         | React + Tailwind                     |
| Backend API      | Flask (`gemmini-2.0-flask`)          |
| ML Models        | Hugging Face Transformers            |
| Authentication   | Firebase Auth                        |
| Hosting          | Firebase / Vercel / Render (custom)  |

## 📁 Folder Structure

```bash
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js
├── backend/
│   ├── app.py             # Flask backend
│   ├── emotion.py         # Emotion prediction
│   ├── summary.py         # Summary generation
│   └── requirements.txt
├── README.md
