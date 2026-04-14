import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { filterClothingItems } from "../../utils/temperature";
import "./Main.css";

export default function Main({ weatherData, clothingItems, onCardClick }) {
  const currentTemperature = weatherData.temperature.F;
  const filteredItems = filterClothingItems(clothingItems, currentTemperature);
  return (
    <main className="main">
      <WeatherCard className="weather" weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {currentTemperature}°F / You may want to wear:
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
