import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "./SearchBar/SearchBar";
import ChatBot from "../ChatBot/GeminiChat";
import { FiSearch } from "react-icons/fi";
import HomeDrop from "./HomeDrop/HomeDrop";
import "./Navigation.css";

function Navigation() {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const handleAIAssistantClick = (e) => {
    e.preventDefault();
    setIsChatBotOpen(true);
  };

  const closeChatBot = () => {
    setIsChatBotOpen(false);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isChatBotOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isChatBotOpen]);

  return (
    <>
      <div className="navigation">
        <div className="nav-left">
          <div className="brand-section">
            <HomeDrop className="menu-icon" />
            <div className="brand-text">
              <NavLink className="brand-name" to="/">
                Online School
              </NavLink>
            </div>
          </div>
        </div>

        <div className="nav-center">
          <div className="search-container">
            <div className="search-bar">
              <FiSearch className="search-icon" />
              <SearchBar />
              <span className="search-shortcut">⌘K</span>
            </div>
          </div>
        </div>

        <div className="nav-right">
          <div className="nav-actions">
            <button
              className="ai-assistant-link"
              onClick={handleAIAssistantClick}
            >
              AI Assistant
            </button>
          </div>
          <ProfileButton />
        </div>
      </div>

      {isChatBotOpen && (
        <div className="dialog-overlay" style={{ zIndex: 9999 }}>
          <ChatBot onClose={closeChatBot} />
        </div>
      )}
    </>
  );
}

export default Navigation;
