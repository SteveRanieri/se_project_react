import SideBar from "./SideBar/SideBar";
import ClothesSection from "./ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  currentUser,
}) {
  return (
    <div className="profile">
      <SideBar currentUser={currentUser} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </div>
  );
}
