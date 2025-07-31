// src/services/api.ts

export async function sendMessage(message: string, sessionId?: string) {
  const response = await fetch('http://localhost:5000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      session_id: sessionId || null,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch response from backend');
  }

  const data = await response.json();

  return {
    reply: data.response,         // Gemini reply
    session_id: data.session_id || sessionId || null, // Track session if added later
  };
}

// Optional: stub for session-based history (if used in your UI)
export async function getMessages(sessionId: string) {
  // Not implemented in Flask yet – can return empty list for now
  return [];
}
