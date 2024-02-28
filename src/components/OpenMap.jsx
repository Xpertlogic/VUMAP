import { useEffect, useState, useRef, useContext, lazy } from "react";
import { LoginContext } from "../context/LoginContext";
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

import MarkerClusterGroup from "react-leaflet-cluster";
// const countryData = lazy(() => import("../data/indiaData.json"));
// const stateData = lazy(() => import("../data/All_State_Data.json"));
// const districtData = lazy(() => import("../data/districts.json"));

function OpenMap({
  markersInsidePolygon,
  setMarkersInsidePolygon,
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
  // const [markersInsidePolygon, setMarkersInsidePolygon] = useState([]);
  const featureGroupRef = useRef();

  //--------------------------------
  const [selectedPolygonLayer, setSelectedPolygonLayer] = useState(null);

  //--------------------------

  const [countryData, setCountryData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [districtData, setDistrictData] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      const dataModuleCountry = await import("../data/indiaData.json");
      setCountryData(dataModuleCountry.default);
    };

    fetchCountryData();
  }, []);

  useEffect(() => {
    const fetchStateData = async () => {
      const dataModuleState = await import("../data/All_State_Data.json");
      setStateData(dataModuleState.default);
    };

    fetchStateData();
  }, []);

  useEffect(() => {
    const fetchDistrictData = async () => {
      const dataModuleDistrict = await import("../data/districts.json");
      setDistrictData(dataModuleDistrict.default);
    };

    fetchDistrictData();
  }, []);

  /* ---------- Login ------------ */
  const { loggedIn } = useContext(LoginContext);

  // const vumapUrl = "https://vumap.s3.ap-south-1.amazonaws.com/district.json";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(vumapUrl);
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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

  /* ----- Created Polygon Draw ---- */
  useEffect(() => {
    if (selectedPolygonLayer) {
      const bounds = selectedPolygonLayer.getBounds();
      const filteredMarkers = markersInsidePolygon.filter((marker) => {
        const coordinates = L.latLng(
          marker.geometry.coordinates[1],
          marker.geometry.coordinates[0]
        );
        return bounds.contains(coordinates);
      });
      setMarkersInsidePolygon(filteredMarkers);
    }
  }, [selectedPolygonLayer, setMarkersInsidePolygon]);

  const handleDrawCreated = async (event) => {
    const getData = filteredAirports;
    console.log(getData);
    const { layer } = event;
    const geoJSONData = layer.toGeoJSON();

    // const geoJSONData = {
    //   type: "FeatureCollection",
    //   features: getData.map((marker) => ({
    //     type: "Feature",
    //     geometry: {
    //       type: "Point",
    //       coordinates: [
    //         marker.geometry.coordinates[0],
    //         marker.geometry.coordinates[1],
    //       ],
    //     },
    //     properties: {
    //       // You can include any additional properties here if needed
    //       AirportName: marker.properties["Airport Name"],
    //       AirportType: marker.properties["Airport Type"],
    //     },
    //   })),
    // };

    // console.log(geoJSONData);

    // ----------------
    setSelectedPolygonLayer(layer);
    setMarkersInsidePolygon([]); // Reset markers inside polygon when new polygon is drawn

    const filteredAirports1 = await airportDataView.features.filter((airport) =>
      selectedAirportTypes.includes(airport.properties["Airport Type"])
    );

    console.log(filteredAirports1);
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

  console.log(markersInsidePolygon);

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
    <div style={{ pointerEvents: loggedIn ? "auto" : "none" }}>
      <MapContainer
        center={centerPosition}
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{
          height: "100vh",
          width: "100%",
        }}
        maxZoom={18}
      >
        {countryView && (
          <GeoJSON data={countryData} style={countryCornersStyle} />
        )}

        {stateView && <GeoJSON data={stateData} style={stateCornersStyle} />}

        {districtView && (
          <GeoJSON data={districtData} style={districtCornersStyle} />
        )}

        {/* Render markers for filtered airports */}

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
                  <img src={airport.properties.Image} alt="airport" />
                  <h3>{airport.properties["Airport Name"]}</h3>
                  <p>{`Type: ${airport.properties["Airport Type"]}`}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* Render markers for filtered POI'S */}

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
              rectangle: false,
              polygon: true,
              polyline: false,
              circle: false,
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
      </MapContainer>
    </div>
  );
}

export default OpenMap;
