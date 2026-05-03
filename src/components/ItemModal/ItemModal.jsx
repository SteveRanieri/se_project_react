import "./ItemModal.css";

export default function ItemModal({ isOpen, card, onClose, onDeleteClick }) {
  if (!isOpen) return null;

  return (
    <div className="itemModalOverlay" onClick={onClose}>
      <div className="itemModalContainer" onClick={(e) => e.stopPropagation()}>
        <button className="itemModalClose" onClick={onClose}>
          ✕
        </button>
        <img className="itemModalImage" src={card.imageUrl} alt={card.name} />
        <div className="itemModalFooter">
          <div className="itemModalInfo">
            <p className="itemModalName">{card.name}</p>
            <p className="itemModalWeather">Weather: {card.weather}</p>
          </div>
          <button className="itemModal__delete" onClick={onDeleteClick}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}
