import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './GeminiChat.css';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

export default function ChatBot() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse('');

    if (!model) {
      setError("Gemini API not initialized. Please ensure VITE_GEMINI_API_KEY is set in your .env file.");
      setLoading(false);
      return;
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      setLoading(false);
      return;
    }

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      console.error("Error calling Gemini API:", err);
      setError(`Failed to get a response from Gemini: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🌟 Online School Assistant</h1>
      <p className="warning">
       Use only for development.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-area"
          rows="6"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Me Anything..."
          disabled={loading}
        />
        <button type="submit" className="ask-button" disabled={loading || !prompt.trim()}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </form>
      <h3 className="reply-title">Online School&apos;s Response:</h3>
      {error && <p className="error">❌ {error}</p>}
      {response && (
        <div className="reply-box">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
