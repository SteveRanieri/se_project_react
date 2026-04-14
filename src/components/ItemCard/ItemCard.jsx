import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <div className="cardHeader">
        <p className="cardName">{item.name}</p>
      </div>
      <img
        className="cardImage"
        src={item.link}
        alt={item.name}
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}
