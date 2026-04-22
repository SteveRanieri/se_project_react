import "./ItemModal.css";

export default function ItemModal({ isOpen, card, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="itemModalOverlay" onClick={onClose}>
      <div className="itemModalContainer" onClick={(e) => e.stopPropagation()}>
        <button className="itemModalClose" onClick={onClose}>
          ✕
        </button>
        <img className="itemModalImage" src={card.link} alt={card.name} />
        <div className="itemModalFooter">
          <p className="itemModalName">{card.name}</p>
          <p className="itemModalWeather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
