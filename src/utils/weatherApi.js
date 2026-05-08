const conditionMap = {
  Clear: "clear",
  Clouds: "cloudy",
  Rain: "rainy",
  Drizzle: "rainy",
  Snow: "snowy",
  Thunderstorm: "stormy",
  Mist: "foggy",
  Fog: "foggy",
  Haze: "foggy",
};

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  )
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(`Error: ${res.status}`);
    })
    .then((data) => {
      const isDay = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;

      const condition = conditionMap[data.weather[0].main] || "clear";

      return {
        city: data.name,
        temperature: {
          F: Math.round(data.main.temp),
          C: Math.round((data.main.temp - 32) * 5 / 9),
        },
        condition,
        isDay,
      };
    });
};
