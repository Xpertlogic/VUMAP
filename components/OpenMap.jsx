import { useEffect, useState, useRef } from "react";
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
import MarkerClusterGroup from "react-leaflet-cluster";

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
  const [centerPosition, setCenterPosition] = useState(mapData);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [markersInsidePolygon, setMarkersInsidePolygon] = useState([]);

  const featureGroupRef = useRef();

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
  const filteredAirports = airportDataView.features.filter((airport) =>
  selectedAirportTypes.includes(airport.properties["Airport Type"])
);
const handleDrawCreated = (event) => {
  const { layer } = event;

    const bounds = layer.getBounds();

    const filteredMarkers = [];

    airportDataView.features.forEach((airport) => {
      const coordinates = L.latLng(
        airport.geometry.coordinates[1],
        airport.geometry.coordinates[0]
      );
      if (bounds.contains(coordinates)) {
        filteredMarkers.push(airport); // Push the marker object
      }
    });

    poiDataView.features.forEach((poi) => {
      const coordinates = L.latLng(
        poi.geometry.coordinates[1],
        poi.geometry.coordinates[0]
      );
      if (bounds.contains(coordinates)) {
        filteredMarkers.push(poi); // Push the marker object
      }
    });

    setMarkersInsidePolygon(filteredMarkers);
  
};

  /* -------------- Airport Data -------------- */

  
  /* ------------------------------------------- */

  /* -------------- POI Data -------------- */

  const filteredPois = poiDataView.features.filter((poi) =>
    selectedPoiTypes.includes(poi.properties.descricao)
  );
  /* ------------------------------------------- */
  console.log(markersInsidePolygon)
  return (
    <MapContainer
      center={centerPosition}
      zoom={zoomLevel}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      maxZoom={18}
    >
      {countryView && (
        <GeoJSON data={countryData} style={countryCornersStyle} />
      )}

      {stateView && <GeoJSON data={stateData} style={stateCornersStyle} />}

      {districtView && (
        <GeoJSON data={districtData} style={districtCornersStyle} />
      )}

      <MarkerClusterGroup>
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
                <h3>{airport.geometry.coordinates[1]},{
              airport.geometry.coordinates[0]}, {airport.properties["Airport Name"]}</h3>
                <p>{`Type: ${airport.properties["Airport Type"]}`}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <MarkerClusterGroup>
        {filteredPois.map((poi, index) => (
          <Marker
            key={index}
            icon={poiIcon}
            position={[
              poi.geometry.coordinates[1],
              poi.geometry.coordinates[0],
            ]}
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
      </MarkerClusterGroup>

      <FeatureGroup ref={featureGroupRef}>
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
          onCreated={handleDrawCreated}
        />
      </FeatureGroup>
      {isMapLayerVisible && (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
      )}

      <button onClick={() => console.log(markersInsidePolygon)}>
        Export Markers Inside Polygon
      </button>
    </MapContainer>
  );
}

export default OpenMap;
