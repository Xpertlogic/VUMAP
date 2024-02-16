import { useState } from "react";
import { useMapEvents } from "react-leaflet";
import "../style/style.css";

function CoordinateDisplay() {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useMapEvents({
    mousemove(e) {
      setCoordinates({
        lat: e.latlng.lat.toFixed(6),
        lng: e.latlng.lng.toFixed(6),
      });
    },
  });

  return (
    <div className="coordinateDisplay">
      Lat: {coordinates.lat}, Lon: {coordinates.lng}
    </div>
  );
}

export default CoordinateDisplay;
