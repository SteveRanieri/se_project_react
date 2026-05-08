export const getWeatherType = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};

export const filterClothingItems = (items, temperature) => {
  return items.filter(
    (item) => item.weather.toLowerCase() === getWeatherType(temperature),
  );
};
