# Mindful AI - Your Wellness Companion

An AI chatbot application built with React, TypeScript and FastAPI that provides mental wellness support through conversational AI.

## Features

- Responsive chat interface for interacting with the AI
- Emotion analysis and visualization
- Personalized summary reports
- User session management and chat history
- Modern, elegant UI design with smooth animations

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- Axios (for API requests)
- React Router (for routing)
- Lucide React (for icons)

### Backend
- FastAPI
- Python
- Pydantic (for data validation)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Python (v3.8 or later)

### Installation

1. Clone the repository

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Running the application

1. Start the backend server:
```bash
npm run backend
```

2. Start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Project Structure

```
├── backend/               # FastAPI backend
│   ├── main.py            # API endpoints and logic
│   └── requirements.txt   # Python dependencies
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx          # Application entry point
└── public/                # Static assets
```

## Future Enhancements

- Integration with a proper AI/ML model for more sophisticated responses
- User authentication and profiles
- More detailed analytics and insights
- Mobile application version
- Voice input/output capabilities