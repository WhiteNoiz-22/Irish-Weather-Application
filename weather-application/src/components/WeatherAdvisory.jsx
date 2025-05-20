import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";

const WeatherAdvisory = () => {
  // We useQuery to get our weather warning data from Met Eireann
  const { data, isPending, error } = useQuery({
    queryKey: ["weatherWarnings"],
    queryFn: getWarnings,
  });

  // Show loading screen if loading
  if (isPending) return <Loading />;

  // Show error screen if error along with the message
  if (error) return <Error error={error.message} />;

  return (
    <>
      <div className="container-sm">
        <h1>Weather Warnings</h1>
        <p>
          Please note, that this weather warning system is for educational
          purposes only. For more information
          on weather warnings please check{" "}
          <a href="https://www.met.ie/warnings-today.html">
            https://www.met.ie/warnings-today.html
          </a>
        </p>
      </div>
      <div className="container-sm">
        {data.length === 0 ? (
          <p>No current warnings.</p>
        ) : (
          <ul>
            {data.map((warning, index) => (
              <div key={index}>
                <h3>{warningLevels(warning.level)}</h3>
                <h4>Affected Area's:</h4>
                {warning.headline}
                <h4>Description:</h4>
                {warning.description}
                <span> </span>
                <h4>Valid From:</h4>
                <p>
                  {new Date(warning.onset).toLocaleString()} to{" "}
                  {new Date(warning.expiry).toLocaleString()}
                </p>
                <p>Last Updated: {warning.updated}</p>
                <h4>Warning Map:</h4>
                <iframe
                  style={{ border: "1px #ccc solid" }}
                  src="https://www.met.ie/widgets/national"
                  name="MEWarning"
                  width="300"
                  height="500"
                  allowFullScreen
                  title="Weather warnings widget"
                ></iframe>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

// This gets our warnings asynchronisly using axios and out met eireann api endpoint
const getWarnings = async () => {
  const apiUrl = "/met/Open_Data/json/warning_IRELAND.json";
  const response = await axios.get(apiUrl);
  return response.data;
};

// This function will conditionally render warning messages based on the type of warning.
function warningLevels(level = "") {
  const lower = level.toLowerCase();
  if (lower.includes("red"))
    return (
      <p>
        🚨 A Red Warning has been issued. Visit{" "}
        <a href="https://www.met.ie/warnings-today.html">met.ie</a> for more
        information.
      </p>
    );
  if (lower.includes("orange"))
    return (
      <p>
        🟠 A Orange Warning has been issued. Visit{" "}
        <a href="https://www.met.ie/warnings-today.html">met.ie</a> for more
        information.
      </p>
    );
  if (lower.includes("yellow"))
    return (
      <p>
        ⚠️ A Yellow Warning has been issued. Visit{" "}
        <a href="https://www.met.ie/warnings-today.html">met.ie</a> for more
        information.
      </p>
    );
  return <p>No warnings in place.</p>;
}

export default WeatherAdvisory;
