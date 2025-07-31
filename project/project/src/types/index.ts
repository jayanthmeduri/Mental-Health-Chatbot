export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: string;
}

export interface EmotionData {
  date: string;
  score: number;
  emotion: 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'neutral';
}

export interface SummaryReport {
  id: string;
  title: string;
  date: string;
  insights: string[];
  emotionSummary: {
    dominant: string;
    improvement: boolean;
  };
}