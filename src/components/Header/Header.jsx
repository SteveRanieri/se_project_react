import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const user = {
    name: "User",
    avatar: "https://placehold.net/avatar.png",
  };
  const location = weatherData.city || "City loading...";
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpened(!isMobileMenuOpened);

  return (
    <header className="header">
      <div className="headerLeft">
        <Link to="/">
          <div className="headerLogo">
            <span className="headerLogoText">wtwr°</span>
          </div>
        </Link>

        <div className="headerMeta">
          <span className="headerDate">{currentDate},</span>
          <span className="headerLocation">{location}</span>
        </div>
      </div>
      <button className="headerToggle" onClick={toggleMobileMenu}>
        {isMobileMenuOpened ? "✕" : "☰"}
      </button>
      <div
        className={`headerNav ${isMobileMenuOpened ? "headerNavOpened" : ""}`}
      >
        <ToggleSwitch />
        <button className="addBtn" onClick={onAddClick}>
          <span className="plus">+</span> Add Clothes
        </button>

        <Link to="/profile" className="user">
          <div className="user">
            <span className="userName">{user.name}</span>
            <img src={user.avatar} alt={user.name} className="avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}
