import "./Header.css";

export default function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const user = {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/40?img=47",
  };
  const location = "San Francisco, CA";

  return (
    <header className="header">
      <div className="headerLeft">
        <div className="headerLogo">
          <span className="headerLogoText">wtwr°</span>
        </div>

        <div className="meta">
          <span className="date">{currentDate},</span>
          <span className="location">{location}</span>
        </div>
      </div>

      <div className="right">
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
