import { useEffect, useState } from "react";
import ForecastIcons from "./ForecastIcons";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";
import "./stylesheets/HourlyForecast.css";

function HourlyForecasts({
  initialLat = 53.35014,
  initialLon = -6.266155,
  initialLocation = "Dublin",
}) {
  //Sets our houly forecasts, initially null
  const [forecastData, setForecastData] = useState(null);

  //Sets our loading state, initially false
  const [loading, setLoading] = useState(false);

  //Our coordinates for our location, initially dublin
  const [coordinates, setCoordinates] = useState({
    lat: initialLat,
    lon: initialLon,
  });

  //Our search location, initially Dublin (Will be implemented in a later build)
  const [search, setSearch] = useState({ location: initialLocation });

  //Our errors, initially empty string
  const [error, setError] = useState("");

  //Fetchs our hourly forecast
  const fetchHourlyForecast = async (latitude, longitude) => {
    //Error handling if there is not latitude or longitude
    if (!latitude || !longitude) {
      setError("Invalid location. Please try again.");
      return;
    }

    //Our API
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,weathercode,wind_speed_10m&timezone=auto`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setForecastData(response.data.hourly);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  //Calls our hourly forecast function and requires the latitude and longitude in order to work
  useEffect(() => {
    fetchHourlyForecast(coordinates.lat, coordinates.lon);
  }, [coordinates.lat, coordinates.lon]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="Headings">
        <h1>Your Hourly Forecast</h1>
        <p>Shows daily forecast data</p>
      </div>
      {forecastData && (
        <div className="container-sm">
          {forecastData.time.slice(0, 24).map((time, index) => (
            <ForecastIcons
            key={index}
            time={time}
            temperature={forecastData.temperature_2m[index]}
            rain={forecastData.precipitation_probability[index]}
            weatherCode={forecastData.weathercode[index]}
            wind={forecastData.wind_speed_10m[index]}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default HourlyForecasts;
