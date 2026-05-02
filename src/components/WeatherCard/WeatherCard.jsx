import "./WeatherCard.css";
import { weatherConditions } from "../../utils/weatherOptions";
import { useTemperature } from "../../context/TemperatureContext";

export default function WeatherCard({ weatherData }) {
  const isFahrenheit = useTemperature();
  const temp = isFahrenheit
    ? weatherData.temperature.F
    : Math.round(((weatherData.temperature.F - 32) * 5) / 9);
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
          ? `${temp}°${isFahrenheit ? "F" : "C"}`
          : "Loading..."}
      </p>
    </section>
  );
}
