import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

export default function Main({ weatherData, clothingItems, onCardClick }) {
  const currentTemperature = weatherData.temperature.F;

  const getWeatherType = () => {
    if (currentTemperature >= 86) return "hot";
    if (currentTemperature >= 66) return "warm";
    return "cold";
  };

  const filteredItems = clothingItems.filter(
    (item) => item.weather === getWeatherType(),
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {currentTemperature}°F / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
