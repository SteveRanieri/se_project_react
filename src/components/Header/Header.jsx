import "./Header.css";
import { useState } from "react";

export default function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const user = {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=47",
  };
  const location = weatherData.city || "City loading...";
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpened(!isMobileMenuOpened);

  return (
    <header className="header">
      <div className="headerLeft">
        <div className="headerLogo">
          <span className="headerLogoText">wtwr°</span>
        </div>

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
        <button className="addBtn" onClick={onAddClick}>
          <span className="plus">+</span> Add Clothes
        </button>

        <div className="user">
          <span className="userName">{user.name}</span>
          <img src={user.avatar} alt={user.name} className="avatar" />
        </div>
      </div>
    </header>
  );
}
