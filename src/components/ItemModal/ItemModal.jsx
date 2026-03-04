import "./ItemModal.css";

export default function ItemModal({ isOpen, card, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="item-modal__overlay" onClick={onClose}>
      <div
        className="item-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="item-modal__close" onClick={onClose}>
          ✕
        </button>
        <img className="item-modal__image" src={card.link} alt={card.name} />
        <div className="item-modal__footer">
          <p className="item-modal__name">{card.name}</p>
          <p className="item-modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
