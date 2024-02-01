import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  GeoJSON,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "../style/style.css";
import { EditControl } from "react-leaflet-draw";
import countryData from "../data/indiaData.json";
import stateData from "../data/All_State_Data.json";
import districtData from "../data/districts.json";

function OpenMap({
  isMapLayerVisible,
  mapData,
  countryView,
  stateView,
  districtView,
  selectedAirportTypes,
  airportDataView,
  selectedPoiTypes,
  poiDataView,
}) {
  // const position = mapData && mapData;
  const [centerPosition, setCenterPosition] = useState(mapData);
  const [zoomLevel, setZoomLevel] = useState(5);

  useEffect(() => {
    setCenterPosition(mapData);
  }, [mapData]);

  useEffect(() => {
    if (countryView) {
      setZoomLevel(6);
    }
  }, [countryView]);

  useEffect(() => {
    if (stateView) {
      setZoomLevel(8);
    }
  }, [stateView]);

  useEffect(() => {
    if (districtView) {
      setZoomLevel(8);
    }
  }, [districtView]);

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

  const districtCornersStyle = {
    radius: 5,
    fillColor: "transparent",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const airportIcon = new L.Icon({
    iconUrl: "images/airport.webp",
    iconSize: [32, 32],
    popupAnchor: [0, -10],
  });

  const poiIcon = new L.Icon({
    iconUrl: "images/markers.png",
    iconSize: [32, 32],
    popupAnchor: [0, -10],
  });

  /* -------------- Airport Data -------------- */

  // Filter the airports based on selected types
  const filteredAirports = airportDataView.features.filter((airport) =>
    selectedAirportTypes.includes(airport.properties["Airport Type"])
  );
  /* ------------------------------------------- */

  /* -------------- POI Data -------------- */

  const filteredPois = poiDataView.features.filter((poi) =>
    selectedPoiTypes.includes(poi.properties.descricao)
  );
  /* ------------------------------------------- */

  return (
    <MapContainer
      center={centerPosition}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
    >
      {countryView && (
        <GeoJSON data={countryData} style={countryCornersStyle} />
      )}

      {stateView && <GeoJSON data={stateData} style={stateCornersStyle} />}

      {districtView && (
        <GeoJSON data={districtData} style={districtCornersStyle} />
      )}

      {/* Render markers for filtered airports */}
      {filteredAirports.map((airport, index) => (
        <Marker
          key={index}
          icon={airportIcon}
          position={[
            airport.geometry.coordinates[1],
            airport.geometry.coordinates[0],
          ]}
        >
          <Popup>
            <div>
              <h3>{airport.properties["Airport Name"]}</h3>
              <p>{`Type: ${airport.properties["Airport Type"]}`}</p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render markers for filtered POI'S */}
      {filteredPois.map((poi, index) => (
        <Marker
          key={index}
          icon={poiIcon}
          position={[poi.geometry.coordinates[1], poi.geometry.coordinates[0]]}
        >
          <Popup>
            <div>
              <h3>{poi.properties.streetname}</h3>
              <p>{`Type: ${poi.properties.estado}`}</p>
              <p>{`Catregory: ${poi.properties.descricao}`}</p>
            </div>
          </Popup>
        </Marker>
      ))}

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
      {isMapLayerVisible && (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
      )}
    </MapContainer>
  );
}

export default OpenMap;
