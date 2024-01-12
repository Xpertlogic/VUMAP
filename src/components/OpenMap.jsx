import { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";

const OpenMap = ({ state }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Initialize the map when the component mounts
    const map = new Map({
      target: "map2",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]),
        zoom: 4.5,
      }),
    });
    setMap(map);

    return () => {
      // Cleanup
      map.setTarget(null);
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
          const geojsonFormat = new GeoJSON();
          const features = geojsonFormat.readFeatures(geojsonData);

          map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
              map.removeLayer(layer);
            }
          });

          const vectorSource = new VectorSource({
            features: features,
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
              stroke: new Stroke({
                color: "blue",
                width: 2,
              }),
              fill: new Fill({
                color: "rgba(0, 0, 255, 0.1)",
              }),
            }),
          });

          map.addLayer(vectorLayer);
          map.getView().fit(vectorSource.getExtent());
        } catch (error) {
          console.error("Error fetching or parsing GeoJSON data:", error);
        }
      }
    };

    fetchAndDisplayStateBoundaries();
  }, [state, map]);

  return (
    <div>
      <div id="map2" style={{ width: "100%", height: "100vh" }}></div>
    </div>
  );
};

export default OpenMap;
