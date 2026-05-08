import ItemCard from "../../ItemCard/ItemCard";
import "./ClothesSection.css";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
}) {
  return (
    <div className="clothesSection">
      <div className="clothesSection__header">
        <p className="clothesSection__title">Your items</p>
        <button className="clothesSection__add" onClick={onAddClick}>
          + Add new
        </button>
      </div>
      <ul className="clothesSection__list">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}
