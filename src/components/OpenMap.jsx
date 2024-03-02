import { useEffect, useState, useRef, useContext } from "react";
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
import axios from "axios";
import JSZip from "jszip";

import MarkerClusterGroup from "react-leaflet-cluster";

function OpenMap({
  markersInsidePolygon,
  setMarkersInsidePolygon,
  isMapLayerVisible,
  countryView,
  stateView,
  districtView,
  cityView,
  selectedAirportTypes,
  selectedRailTypes,
  selectedPoiTypes,
  poiDataView,
}) {
  const [centerPosition, setCenterPosition] = useState([22.8046, 86.2029]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const featureGroupRef = useRef();

  //--------------------------------
  const [selectedPolygonLayer, setSelectedPolygonLayer] = useState(null);

  //--------------------------
  /* ------ Country-State-District-City ------ */
  const [countryData, setCountryData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [poiData, setPoiData] = useState();
  const [airportData, setAirportData] = useState();
  const [railData, setRailData] = useState();
  const [railPlatformData, setRailPlatformData] = useState();

  const baseUrl = "https://vumap.s3.ap-south-1.amazonaws.com";

  /* ----- Countries ----- */
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/boundary.geojson`
        );
        const responseAirport = await axios.get(
          `${baseUrl}/${countryView}/airports.geojson`
        );

        setCountryData(response.data);
        setAirportData(responseAirport.data);
      } catch (error) {
        console.error("Error fetching Country Boundary:", error);
      }
    };

    const fetchRailData = async () => {
      try {
        const responseRail = await axios.get(
          `${baseUrl}/${countryView}/Indianrailline.zip`,
          { responseType: "arraybuffer" }
        );

        const zip = new JSZip();
        const zipFile = await zip.loadAsync(responseRail.data);
        // Assuming your GeoJSON file is named "boundary.geojson" within the ZIP
        const geojsonStr = await zipFile
          .file("Indianrailline.geojson")
          .async("string");
        const geojsonData = JSON.parse(geojsonStr);

        setRailData(geojsonData);
      } catch (error) {
        console.error("Error fetching Country Boundary:", error);
      }
    };
    const fetchRailPlatformData = async () => {
      try {
        const responseRailPlatform = await axios.get(
          `${baseUrl}/${countryView}/railwayplatform.zip`,
          { responseType: "arraybuffer" }
        );

        const zip = new JSZip();
        const zipFile = await zip.loadAsync(responseRailPlatform.data);
        // Assuming your GeoJSON file is named "boundary.geojson" within the ZIP
        const geojsonStr = await zipFile
          .file("railwayplatform.geojson")
          .async("string");
        const geojsonData = JSON.parse(geojsonStr);

        setRailPlatformData(geojsonData);
      } catch (error) {
        console.error("Error fetching Country Boundary:", error);
      }
    };

    if (countryView) {
      setZoomLevel(5);
    }

    fetchRailData();
    fetchRailPlatformData();
    fetchCountryData();
  }, [countryView]);

  /* ----- States ----- */

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/boundary.geojson`
        );
        const statePositionVal =
          response.data.features[0].geometry.coordinates[0].flat()[0];

        setStateData(response.data);

        setCenterPosition([statePositionVal[1], statePositionVal[0]]);
      } catch (error) {
        console.error("Error fetching State Boundary:", error);
      }
    };

    if (stateView) {
      setZoomLevel(6);
    }
    if (stateView?.length > 0) {
      fetchStateData();
    }
  }, [stateView]);

  /* ----- Districts ----- */

  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/boundary.geojson`
        );

        const districtPositionVal =
          response.data.features[0].geometry.coordinates[0].flat()[0];

        setDistrictData(response.data);

        setCenterPosition([districtPositionVal[1], districtPositionVal[0]]);
      } catch (error) {
        console.error("Error fetching District Boundary:", error);
      }
    };

    if (districtView) {
      setZoomLevel(9);
    }

    if (districtView?.length > 0) {
      fetchDistrictData();
    }
  }, [districtView]);

  /* ----- Cities ----- */

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/boundary.geojson`
        );

        const responsePoi = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/POI.geojson`
        );

        const cityPositionVal =
          response.data.features[0].geometry.coordinates[0].flat()[0];

        setPoiData(responsePoi.data);

        setCenterPosition([cityPositionVal[1], cityPositionVal[0]]);

        setCityData(response.data);
      } catch (error) {
        console.error("Error fetching City Boundary:", error);
      }
    };

    if (cityView) {
      setZoomLevel(11);
    }

    if (cityView?.length > 0) {
      fetchCitiesData();
    }
  }, [cityView]);

  /* ----------------------------------------------------- */

  /* ---------- Login ------------ */
  const { loggedIn } = useContext(LoginContext);

  // useEffect(() => {
  //   setCenterPosition(mapData);
  // }, [mapData]);

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

  const cityCornersStyle = {
    radius: 5,
    fillColor: "transparent",
    color: "black",
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

  const railLineStyle = {
    fillColor: "brown",
    color: "brown",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

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
    // const getData = filteredAirports;
    // console.log(getData);
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

    // const filteredAirports1 = await airportDataView.features.filter((airport) =>
    //   selectedAirportTypes.includes(airport.properties["Airport Type"])
    // );

    // console.log(filteredAirports1);
    // const bounds = layer.getBounds();
    // const filteredMarkers = [];
    // airportDataView.features.forEach((airport) => {
    //   const coordinates = L.latLng(
    //     airport.geometry.coordinates[1],
    //     airport.geometry.coordinates[0]
    //   );
    //   if (bounds.contains(coordinates)) {
    //     filteredMarkers.push(airport); // Push the marker object
    //   }
    // });
    //   poiDataView.features.forEach((poi) => {
    //     const coordinates = L.latLng(
    //       poi.geometry.coordinates[1],
    //       poi.geometry.coordinates[0]
    //     );
    //     if (bounds.contains(coordinates)) {
    //       filteredMarkers.push(poi); // Push the marker object
    //     }
    //   });
    //   setMarkersInsidePolygon(filteredMarkers);
  };

  // console.log(markersInsidePolygon);

  /* -------------- Airport Data -------------- */
  const filteredAirports = airportData?.features.filter((airport) =>
    selectedAirportTypes.includes(airport.airporttype)
  );

  /* -------------- Railway Data -------------- */
  console.log(railData);
  // const filteredRails = railData?.features.filter((airport) =>
  //   selectedAirportTypes.includes(airport.airporttype)
  // );

  /* ------------------------------------------- */

  /* -------------- POI Data -------------- */

  const filteredPois = poiDataView.features.filter((poi) =>
    selectedPoiTypes.includes(poi.properties.descricao)
  );
  /* ------------------------------------------- */
  console.log(railPlatformData);
  return (
    <div style={{ pointerEvents: loggedIn ? "auto" : "none" }}>
      <MapContainer
        key={centerPosition}
        center={centerPosition} // am receive the position through mapData from
        zoom={zoomLevel}
        scrollWheelZoom={true}
        style={{
          height: "100vh",
          width: "100%",
        }}
        maxZoom={18}
      >
        {countryView && countryData && (
          <GeoJSON data={countryData} style={countryCornersStyle} />
        )}

        {stateView && stateData && (
          <GeoJSON
            key={JSON.stringify(stateData)}
            data={stateData}
            style={stateCornersStyle}
          />
        )}

        {districtView && districtData && (
          <GeoJSON
            key={JSON.stringify(districtData)}
            data={districtData}
            style={districtCornersStyle}
          />
        )}

        {cityView && cityData && (
          <GeoJSON
            key={JSON.stringify(cityData)}
            data={cityData}
            style={cityCornersStyle}
          />
        )}

        {selectedRailTypes.includes("Rail Line") && (
          <GeoJSON
            key={JSON.stringify(railData)}
            data={railData}
            style={railLineStyle}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(feature.properties.name);
            }}
          />
        )}

        {/* Render markers for filtered airports */}

        <MarkerClusterGroup>
          {filteredAirports?.map((airport, index) => (
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
                  <p>{`Type: ${airport.airporttype}`}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        {selectedRailTypes.includes("Platforms") && (
          <MarkerClusterGroup>
            {railPlatformData?.features?.map((airport, index) => (
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
                    <p>{`Type: ${airport.airporttype}`}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        )}

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
