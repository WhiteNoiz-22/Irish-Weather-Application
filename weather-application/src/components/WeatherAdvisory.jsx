import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "./Error";
import axios from "axios";

const WeatherAdvisory = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["weatherWarnings"],
    queryFn: getWarnings,
  });

  if (isPending) return <Loading />;
  if (error) return <Error error={error.message} />;

  return (
    <>
      <div className="container-sm">
        <h1>Weather Warnings</h1>
        <p>
          Please note, that this weather warning system is for educational
          purposes only and should NOT be taken seriously. For more information
          on weather warnings please check{" "}
          <a href="https://www.met.ie/warnings-today.html">
            https://www.met.ie/warnings-today.html
          </a>
        </p>
      </div>
      <div className="container-sm">
        <h2>Weather Advisories (Met Éireann)</h2>
        {data.length === 0 ? (
          <p>No current warnings.</p>
        ) : (
          <ul>
            {data.map((warning, index) => (
              <li key={index}>
                <strong>{warning.type || "Advisory"}:</strong>{" "}
                {warning.description || warning.headline}
                <br />
                <em>
                  {new Date(warning.onset).toLocaleString()} to{" "}
                  {new Date(warning.expiry).toLocaleString()}
                </em>
                {warningLevels(warning.level)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

const getWarnings = async () => {
  const apiUrl = "/met/Open_Data/json/warning_IRELAND.json"; // goes through Vite proxy
  const response = await axios.get(apiUrl);
  return response.data;
};

function warningLevels(level = "") {
  const lower = level.toLowerCase();
  if (lower.includes("red"))
    return (
      <p>
        🚨 Red Warning issued. See{" "}
        <a href="https://www.met.ie/warnings-today.html">met.ie</a>
      </p>
    );
  if (lower.includes("orange"))
    return (
      <p>
        🟠 Orange Warning issued. See{" "}
        <a href="https://www.met.ie/warnings-today.html">met.ie</a>
      </p>
    );
  if (lower.includes("yellow"))
    return (
      <p>
        🟡 Yellow Warning issued. See{" "}
        <a href="https://www.met.ie/warnings-today.html">met.ie</a>
      </p>
    );
  return null;
}

export default WeatherAdvisory;
