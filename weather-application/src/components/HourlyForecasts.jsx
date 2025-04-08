import { useEffect, useState } from "react";
import ForecastIcons from "./ForecastIcons";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";
import "./stylesheets/HourlyForecast.css";

function HourlyForecasts(){
  //Sets our houly forecasts, initially null
  const [forecastData, setForecastData] = useState(null);

  //Sets our loading state, initially false
  const [loading, setLoading] = useState(false);

  //Retrieve location data from localStorage
  const locationData = JSON.parse(localStorage.getItem("locationData"));
  console.log("Retrieved Location Data:", locationData);

  //Our errors, initially empty string
  const [error, setError] = useState("");

  

  // Check if location data is available
  if (!locationData || !locationData.latitude || !locationData.longitude || !locationData.location) {
    return <Error error="Location data is missing or invalid. Please go back and search for a location." />;
  }
  

  const { latitude, longitude, location: searchLocation } = locationData;


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
        //Sets our hourly data
        const hourlyData = response.data.hourly;
      
        //Gets the correct time
        const currentTimeISO = new Date().toISOString();

        //Starts the index at our current time
        const startIndex = hourlyData.time.findIndex((time) => time >= currentTimeISO);
        
        //Filters our data by using the slice function
        const filteredData = {
          time: hourlyData.time.slice(startIndex, startIndex + 24),
          temperature_2m: hourlyData.temperature_2m.slice(startIndex, startIndex + 24),
          precipitation_probability: hourlyData.precipitation_probability.slice(startIndex, startIndex + 24),
          weathercode: hourlyData.weathercode.slice(startIndex, startIndex + 24),
          wind_speed_10m: hourlyData.wind_speed_10m.slice(startIndex, startIndex + 24),
        };
      
        setForecastData(filteredData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

  //Calls our hourly forecast function and requires the latitude and longitude in order to work
  useEffect(() => {
    fetchHourlyForecast(latitude, longitude);
  }, [latitude, longitude]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="Headings">
        <h1>Your Hourly Forecast for {searchLocation}</h1>
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
