import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <div className="card__header">
        <p className="card__name">{item.name}</p>
      </div>
      <img
        className="card__image"
        src={item.link}
        alt={item.name}
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}
