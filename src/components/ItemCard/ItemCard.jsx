import "./ItemCard.css";

export default function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <p className="cardName">{item.name}</p>

      <img
        className="cardImage"
        src={item.link}
        alt={item.name}
        onClick={() => onCardClick(item)}
      />
    </li>
  );
}
