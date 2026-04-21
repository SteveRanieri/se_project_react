import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { filterClothingItems } from "../../utils/temperature";
import "./Main.css";

export default function Main({ weatherData, clothingItems, onCardClick }) {
  const currentTemperature = weatherData.temperature.F;
  const isLoaded = Number.isFinite(currentTemperature);
  const filteredItems = isLoaded
    ? filterClothingItems(clothingItems, currentTemperature)
    : clothingItems;
  return (
    <main className="main">
      <WeatherCard className="weather" weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          {isLoaded
            ? `Today is ${currentTemperature}°F / You may want to wear:`
            : "Loading weather..."}
        </p>
        <ul className="cardsList">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
