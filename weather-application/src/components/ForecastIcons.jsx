function ForecastIcons({ date, minTemp, maxTemp, rain, weatherCode }) {
    //Our weather icons
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
  
    //Returns our forecast template for each day
    return (
      <div>
        <br/>
        <h4>{new Date(date).toDateString()}</h4>
        <p>{rain > 0 ? "🌧️" : weatherIcons[weatherCode] || "❓"}</p>
        <p>Highest Temperature: {Math.round(maxTemp)}°C</p>
        <p>Lowest Temperature: {Math.round(minTemp)}°C</p>
        <p>Rain: {rain}mm</p>
      </div>
    );
  }

  export default ForecastIcons;