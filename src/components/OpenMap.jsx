import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

const OpenMap = ({ state }) => {
  const [map, setMap] = useState(null);
  const [drawnItems, setDrawnItems] = useState(null);

  useEffect(() => {
    // Initialize the map when the component mounts
    const mapInstance = L.map("map2").setView([20.5937, 78.9629], 4.5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance);

    setMap(mapInstance);

    // Initialize Leaflet Draw
    const drawnItemsLayer = new L.FeatureGroup();
    mapInstance.addLayer(drawnItemsLayer);
    setDrawnItems(drawnItemsLayer);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        circle: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItemsLayer,
        remove: true,
      },
    });

    mapInstance.addControl(drawControl);

    return () => {
      // Cleanup when the component unmounts
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  useEffect(() => {
    const fetchAndDisplayStateBoundaries = async () => {
      if (state && map) {
        try {
          // Fetch the GeoJSON file based on the selected state
          const response = await fetch(`./Orissa.geojson`, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok || response.status !== 200) {
            throw new Error("Failed to fetch GeoJSON data");
          }

          const geojsonData = await response.json();

          // Remove previous GeoJSON layer if it exists
          if (drawnItems) {
            map.removeLayer(drawnItems);
          }

          const newGeojsonLayer = L.geoJSON(geojsonData, {
            style: {
              color: "blue",
              weight: 2,
              fillOpacity: 0.1,
            },
          });

          newGeojsonLayer.addTo(map);
          map.fitBounds(newGeojsonLayer.getBounds());

          // Add the new GeoJSON layer to the drawn items layer
          drawnItems.addLayer(newGeojsonLayer);
        } catch (error) {
          console.error("Error fetching or parsing GeoJSON data:", error);
        }
      }
    };

    fetchAndDisplayStateBoundaries();
  }, [state, map, drawnItems]);

  return (
    <div>
      <div id="map2" style={{ width: "100%", height: "80vh" }}></div>
    </div>
  );
};

export default OpenMap;