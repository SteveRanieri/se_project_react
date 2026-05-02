import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sideBar">
      <img
        className="sideBar__avatar"
        src="https://i.pravatar.cc/40?img=47"
        alt="Jane Smith"
      />
      <p className="sideBar__username">Jane Smith</p>
    </div>
  );
}
