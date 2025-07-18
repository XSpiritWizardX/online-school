import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import ChatBot from "../ChatBot/GeminiChat";
import { FiAlignJustify } from "react-icons/fi";
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

  return (
    <>
      <div className="navigation">
        <div className="home-links-container">
          <FiAlignJustify className="menu-icon" />

          <NavLink className={"home-link"} to="/">
            Online School Name
          </NavLink>
        </div>

        <SearchBar />

        <div className="nav-links-container">
          <div className="nav-links">
            <NavLink className={"dashboard-link"} to="coming-soon">
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
