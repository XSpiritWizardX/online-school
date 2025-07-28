import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import ChatBot from "../ChatBot/GeminiChat";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
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
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isChatBotOpen]);

  return (
    <>
      <div className="navigation">
        <div className="home-links-container">
          <FiAlignJustify className="menu-icon" />

          <NavLink className={"home-link"} to="/">
            Online School Name
          </NavLink>
        </div>

        <div className="search-container">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <SearchBar />
            <span className="search-shortcut">⌘K</span>
          </div>
        </div>

        <div className="nav-links-container">
          <div className="nav-links">
            <NavLink className={"dashboard-link"} to="/course-editor">
              My Courses
            </NavLink>

            <button
              className={"ai-assistant-link"}
              onClick={handleAIAssistantClick}
            >
              AI Assistant
            </button>
          </div>

          <ProfileButton />
        </div>
      </div>

      {isChatBotOpen && (
        <div className="dialog-overlay">
          <ChatBot onClose={closeChatBot} />
        </div>
      )}
    </>
  );
}

export default Navigation;
