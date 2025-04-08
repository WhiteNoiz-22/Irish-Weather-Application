function ForecastIcons({
  date,
  time,
  minTemp,
  maxTemp,
  temperature,
  rain,
  weatherCode,
  wind,
}) {
  const weatherIcons = {
    0: "☀️",
    1: "🌤️",
    2: "⛅",
    3: "☁️",
    45: "🌫️",
    51: "🌦️",
    61: "🌦️",
    63: "🌧️",
    80: "🌧️",
    95: "⛈️",
  };

  //Will display the data or time depending on where it's being called
  const displayTime = date || time;
  //This will format our time correctly
  const formattedTime = displayTime
    ? new Date(displayTime).toLocaleString(undefined, {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown time";

  return (
    <div className="forecast-icon">
      <h4>{formattedTime}</h4>
      <p>{rain > 0 ? "🌧️" : weatherIcons[weatherCode] || "❓"}</p>

      {temperature !== undefined && <p>Temperature: {Math.round(temperature)}°C</p>}
      {maxTemp !== undefined && <p>Highest Temp: {Math.round(maxTemp)}°C</p>}
      {minTemp !== undefined && <p>Lowest Temp: {Math.round(minTemp)}°C</p>}
      {rain !== undefined && <p>Rain: {rain}{rain < 1 ? "%" : "mm"}</p>}
      {wind !== undefined && <p>Wind: {Math.round(wind)} km/h</p>}
    </div>
  );
}

export default ForecastIcons;
