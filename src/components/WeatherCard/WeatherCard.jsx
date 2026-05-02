import "./WeatherCard.css";
import { weatherConditions } from "../../utils/weatherOptions";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const weatherOption = weatherConditions.find(
    (option) =>
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition,
  );

  return (
    <section
      className="weather-card"
      style={
        weatherOption ? { backgroundImage: `url(${weatherOption.url})` } : {}
      }
    >
      <p className="weather-card__temp">
        {Number.isFinite(weatherData.temperature.F)
          ? `${weatherData.temperature[currentTemperatureUnit]}°${currentTemperatureUnit}`
          : "Loading..."}
      </p>
    </section>
  );
}
