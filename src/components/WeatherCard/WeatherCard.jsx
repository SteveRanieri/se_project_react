import "./WeatherCard.css";
import { weatherConditions } from "../../utils/weatherOptions";

export default function WeatherCard({ weatherData }) {
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
          ? `${weatherData.temperature.F}°F`
          : "Loading..."}
      </p>
    </section>
  );
}
