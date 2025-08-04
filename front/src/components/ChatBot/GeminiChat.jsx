import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FiX,
  FiCopy,
  FiCheck,
  FiTrash2,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";
import "./GeminiChat.css";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI
  ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" })
  : null;

export default function ChatBot({ onClose }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse("");

    if (!model) {
      setError(
        "Gemini API not initialized. Please ensure VITE_GEMINI_API_KEY is set in your .env file.",
      );
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
      setError(
        `Failed to get a response from Gemini: ${err.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (response) {
      try {
        await navigator.clipboard.writeText(response);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const handleClear = () => {
    setResponse("");
    setError(null);
    setCopied(false);
    setExpanded(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Fullscreen overlay when expanded
  if (expanded && response) {
    return (
      <div className="fullscreen-overlay">
        <div className="fullscreen-container">
          <div className="fullscreen-header">
            <h2 className="fullscreen-title">
              Online School Assistant - Response
            </h2>
            <div className="fullscreen-buttons">
              <button
                onClick={handleCopy}
                className="copy-button"
                title={copied ? "Copied!" : "Copy response"}
              >
                {copied ? <FiCheck /> : <FiCopy />}
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={handleExpand}
                className="minimize-button"
                title="Minimize"
              >
                <FiMinimize2 />
                Minimize
              </button>

              <button
                onClick={handleClear}
                className="clear-button"
                title="Clear response"
              >
                <FiTrash2 />
                Clear
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="close-button"
                  title="Close"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>

          <div className="fullscreen-content">
            <div className="fullscreen-response">
              <p>{response}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        {onClose && (
          <button
            onClick={onClose}
            className="close-button"
            title="Close"
          >
            <FiX />
          </button>
        )}
        <h1 className="title-ai-chat"> Online School Assistant</h1>
      </div>

      <p className="warning">Use only for development.</p>

      <div className="response-section">
        <div className="responsei">
          {response && (
            <div className="response-header-section">
              <h3 className="reply-title">Response Area:</h3>
              <div className="response-buttons">
                <button
                  onClick={handleCopy}
                  className="copy-button"
                  title={copied ? "Copied!" : "Copy response"}
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={handleExpand}
                  className="expand-button"
                  title="Expand to fullscreen"
                >
                  <FiMaximize2 />
                  Expand
                </button>

                <button
                  onClick={handleClear}
                  className="clear-button"
                  title="Clear response"
                >
                  <FiTrash2 />
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <p className="error">❌ {error}</p>}

        {loading && (
          <div className="reply-box loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {response && (
          <div className="reply-container">
            <div className="reply-box">
              <p>{response}</p>
            </div>
          </div>
        )}

        <br />

        <form onSubmit={handleSubmit}>
          <textarea
            className="input-area"
            rows="4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Me Anything..."
            disabled={loading}
          />
          <button
            type="submit"
            className="ask-button"
            disabled={loading || !prompt.trim()}
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>
      </div>
    </div>
  );
}
