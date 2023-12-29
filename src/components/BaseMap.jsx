import React, { useEffect, useState } from "react";
import "../index.css";
import "../style/style.css";
import CoordinateDisplay from "./CoordinateDisplay";
import {
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  LayersControl,
  GeoJSON,
  TileLayer,
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import Roads from "../data/Road.json";
import Buildings from "../data/Buildings.json";
import POI from "../data/POI.json";

function BaseMap({ data, state, city, categoryName }) {
  const position = data && data;
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapLayer, setMapLayer] = useState(false);

  //-----------------------------------------
  const [atmCollegeData, setAtmCollegeData] = useState([]);

  useEffect(() => {
    const filteredPOIData = POI.features.filter(
      (poi) =>
        poi.properties.Category === "ATM" ||
        poi.properties.descricao === "College/University"
    );
    setAtmCollegeData(filteredPOIData);
  }, []);

  const customMarkerIcon = (type) => {
    if (type === "ATM") {
      return L.icon({
        iconUrl: "atm.svg",
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -20],
      });
    } else if (type === "College/University") {
      return L.icon({
        iconUrl: "college.svg",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -20],
      });
    }
  };
  //-----------------------------------------

  //--------------Mouse Move ------------------

  //----------------------------

  useEffect(() => {
    if (data) {
      setZoomLevel(6);
    }
  }, [data]);
  useEffect(() => {
    if (city) {
      setZoomLevel(11);
    }
  }, [city]);
  useEffect(() => {
    if (categoryName) {
      setZoomLevel(14);
    }
  }, [categoryName]);
  const buildingStyle = {
    fillColor: "blue", // Set your desired fill color
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  };
  const roadStyle = {
    weight: 3,
    opacity: 0.7,
    color: "red", // Set your desired color for roads
  };
  const stateCornersStyle = {
    radius: 5,
    fillColor: "transparent", // Set your desired fill color for state corners
    color: "green",
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8,
  };
  const poiStyle = {
    radius: 8,
    fillColor: "yellow", // Set your desired fill color for POI
    color: "black", // Set your desired border color for POI
    weight: 2,
    opacity: 1,
    fillOpacity: 0.8,
  };

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      if (feature.properties.IDPRIM) {
        layer.bindPopup(`Building ID: ${feature.properties.IDPRIM}`);
      } else if (feature.properties.highway) {
        layer.bindPopup(`Road Type: ${feature.properties.highway}`);
      } else if (feature.properties.isStateCorner) {
        layer.bindPopup("State Corner");
        layer.setStyle(stateCornersStyle);
      } else if (feature.properties.poiType) {
        layer.bindPopup(`POI Type: ${feature.properties.poiType}`);
        layer.setStyle(poiStyle);
      }
    }
  };
  /* ------- For Create/Edit/Delete Shapes -------- */
  const onCreate = () => {};
  const onEdit = () => {};
  const onDelete = () => {};

  /* --------------------------------------------- */
  function MyComponent() {
    //----------- Map Switch Componate -------------

    function MapSwitch() {
      return (
        <>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked={mapLayer} name="OSM">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </>
      );
    }
    return (
      <div>
        {
          <div className="check-box ml-3">
            <label>
              <input
                type="checkbox"
                checked={mapLayer}
                onClick={() => setMapLayer(!mapLayer)}
              />
              Map Layer
            </label>
          </div>
        }
        <MapContainer
          className="mapBox"
          center={position}
          zoom={zoomLevel}
          scrollWheelZoom={true}
        >
          <FeatureGroup>
            <EditControl
              position="topleft"
              onCreated={onCreate}
              onEdited={onEdit}
              onDeleted={onDelete}
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
          {mapLayer && <MapSwitch />}
          {state && (
            <GeoJSON
              data={state}
              style={stateCornersStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {state && (
            <GeoJSON
              data={city}
              style={stateCornersStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {/* {Bhuvneshwar && (
            <GeoJSON
              data={Bhuvneshwar}
              style={stateCornersStyle}
              onEachFeature={onEachFeature}
            />
          )} */}
          {categoryName === "Roads" && (
            <GeoJSON
              data={Roads}
              style={roadStyle}
              // onEachFeature={onEachFeature}
            />
          )}
          {categoryName === "Buildings" && (
            <GeoJSON
              data={Buildings}
              style={buildingStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {categoryName === "POI" && (
            <GeoJSON
              data={POI}
              // style={poiStyle}
              // onEachFeature={onEachFeature}
            />
          )}
          {/* Custom markers for ATM and colleges */}

          {atmCollegeData.map((poi) => (
            <Marker
              key={poi.properties.IDPRIM}
              position={[
                poi.geometry.coordinates[1],
                poi.geometry.coordinates[0],
              ]}
              icon={customMarkerIcon(
                poi.properties.Category || poi.properties.descricao
              )}
            >
              <div>{poi.properties.streetname}</div>
              <Tooltip className="customTooltip" direction="right">
                <h3>{poi.properties.streetname}</h3>
              </Tooltip>
              <Popup>
                <div>
                  <h1 className="text-[1.4rem]">{poi.properties.streetname}</h1>
                  <p>{poi.properties.descricao}</p>
                  <p>{`Coordinates - ${poi.geometry.coordinates} `}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          {/* Display coordinates on Mouse Move */}
          <CoordinateDisplay />
        </MapContainer>
      </div>
    );
  }

  return (
    <div>
      <div>
        <MyComponent />
      </div>
    </div>
  );
}

export default BaseMap;
