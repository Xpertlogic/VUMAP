import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import StateData from '../data/odisha.json'
function OpenMap({ mapData, stateView }) {
  const position = mapData && mapData;
  const [zoomLevel, setZoomLevel] = useState(5);

  const stateCornersStyle = {
    radius: 5,
    fillColor: "transparent",
    color: "blue",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  };

  useEffect(() => {
    if (mapData) {
      setZoomLevel(6);
    }
  }, [mapData]);

  return (
    <MapContainer
      center={position}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      {stateView && <GeoJSON data={StateData} style={stateCornersStyle} />}
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
