import { MapContainer, TileLayer } from "react-leaflet";
import "./stylesheets/Map.css";

function Map() {
  //Map defaults to center ireland
  const position = [53.4494762, -7.5029786];
  return (
    <>
    <div className="container-sm">
      <h1>Your Weather Map</h1>
      <p>Updates Hourly</p>
    </div>
    <div className="container-sm">
      <MapContainer
        center={position}
        zoom={7}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      </div>
    </>
  );
}

export default Map;
