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

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
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
        },
        condition,
        isDay,
      };
    });
};
