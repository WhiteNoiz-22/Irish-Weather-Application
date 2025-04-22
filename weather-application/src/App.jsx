import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Error from "./components/Error";
import HourlyForecasts from "./components/HourlyForecasts";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
        <Route path="/hourly" element={<HourlyForecasts/>} />
      </Routes>
      <footer>
        <p>
          This weather app only accepts locations within the Republic of
          Ireland.
        </p>
        <p>
          NOTE: This weather app is limited to a certain number of API calls per
          hour. If the App suddenly stops working, it means the API call limit
          has been reached.
        </p>
        <p>
          All Weather and Geocode data provided by{" "}
          <a href="https://open-meteo.com/">OpenMeteo</a> and{" "}
          <a href="https://openweathermap.org/">OpenWeatherMap</a>. Radar data is
          provided by <a href="https://www.rainviewer.com/">RainViewer</a>.
        </p>
      </footer>
    </>
  );
}

export default App;
