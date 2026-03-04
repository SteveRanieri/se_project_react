import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temperature.F}°F</p>
    </section>
  );
}
