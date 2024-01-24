import { useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

function OpenMap({ mapData, countryView, stateView }) {
  // const position = mapData && mapData;
  const [centerPosition, setCenterPosition] = useState([20.5937, 78.9629]);
  const [zoomLevel, setZoomLevel] = useState(5);

  const countryCornersStyle = {
    radius: 5,
    fillColor: "transparent",
    color: "blue",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const stateCornersStyle = {
    radius: 5,
    fillColor: "transparent",
    color: "green",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  };

  return (
    <MapContainer
      center={centerPosition}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      {countryView && (
        <GeoJSON data={countryView} style={countryCornersStyle} />
      )}
      {stateView && <GeoJSON data={stateView} style={stateCornersStyle} />}
      <FeatureGroup>
        <EditControl
          position="topleft"
          draw={{
            rectangle: true,
            polygon: true,
            polyline: false, 
            circle: true,
            circlemarker: false,
            marker: false,
          }}
        />
      </FeatureGroup>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default OpenMap;
