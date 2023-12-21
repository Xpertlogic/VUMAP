import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  LayersControl,
  GeoJSON,
  TileLayer,
} from "react-leaflet";
import Roads from "../data/Road.json";
import Buildings from "../data/Buildings.json";
import POI from "../data/POI.json";
import Bhuvneshwar from "../data/BBSR.json";

function BaseMap({ data, state, categoryName }) {
  const position = data && data;
  const [zoomLevel, setZoomLevel] = useState(5);

  useEffect(() => {
    if (data) {
      setZoomLevel(6);
    }
  }, [data]);
  useEffect(() => {
    if (categoryName) {
      setZoomLevel(8);
    }
  }, [categoryName]);
  const buildingStyle = {
    fillColor: 'blue',  // Set your desired fill color
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7,
  };
  const roadStyle = {
    weight: 3,
    opacity: 0.7,
    color: 'red',  // Set your desired color for roads
  };
  const stateCornersStyle = {
    radius: 5,
    fillColor: 'transparent',  // Set your desired fill color for state corners
    color: 'green',
    weight: 3,
    opacity: 1,
    fillOpacity: 0.8,
  }; 
  const poiStyle = {
    radius: 8,
    fillColor: 'yellow',  // Set your desired fill color for POI
    color: 'black',  // Set your desired border color for POI
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
        layer.bindPopup('State Corner');
        layer.setStyle(stateCornersStyle);
      } else if (feature.properties.poiType) {
        layer.bindPopup(`POI Type: ${feature.properties.poiType}`);
        layer.setStyle(poiStyle);
      }
    }
  };
  function MyComponent() {
    //---------- Custom Marker component -----------

    function CustomMarker({ position, item }) {
      console.log(item)
      return (
        <>
          <Marker position={[position[1], position[0]]}>
            <Popup>
              <img src={item.properties["image"]} />
              {item.properties["POI Name"]}</Popup>
          </Marker>
        </>
      );
    }

    //----------- Map Switch Componate -------------

    function MapSwitch() {
      return (
        <>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OSM">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="NATURAL MAP">
              <TileLayer
                attribution="OpenToPoMap"
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="WATER COLOR MAP">
              <TileLayer
                attribution="OpenToWater"
                url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </>
      );
    }
    return (
      <div>
        <MapContainer
          className="h-screen w-full"
          center={position}
          zoom={zoomLevel}
          scrollWheelZoom={false}
        >
          {<MapSwitch />}
          {state && (
            <GeoJSON
              data={state}
              style={stateCornersStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {Bhuvneshwar && (
            <GeoJSON
              data={Bhuvneshwar}
              style={stateCornersStyle}
              onEachFeature={onEachFeature}
            />
          )}
          {categoryName === "Roads" && (
            <GeoJSON
              data={Roads}
              style={roadStyle}
              onEachFeature={onEachFeature}
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
              style={poiStyle}
              onEachFeature={onEachFeature}
            />
      )}
        </MapContainer>
      </div>
    );
  }

  return (
    <div className="relative">
      <div>
        <MyComponent />
      </div>
    </div>
  );
}

export default BaseMap;
