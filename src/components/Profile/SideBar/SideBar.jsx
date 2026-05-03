import "./SideBar.css";

export default function SideBar({ currentUser }) {
  return (
    <div className="sideBar">
      <img
        className="sideBar__avatar"
        src={currentUser.avatar}
        alt={currentUser.name}
      />
      <p className="sideBar__username">{currentUser.name}</p>
    </div>
  );
}
