import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchBar from "../SearchBar/SearchBar";
import { FiAlignJustify } from "react-icons/fi";
import "./Navigation.css";

function Navigation() {
  return (
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

          <NavLink className={"ai-assistant-link"} to="/chat">
            AI Assistant
          </NavLink>
        </div>

        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
