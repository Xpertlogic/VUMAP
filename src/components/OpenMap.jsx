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
  buildingTypes,
  selectedRoads,
  homeSelected,
}) {
  const [centerPosition, setCenterPosition] = useState([22.8046, 86.2029]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const featureGroupRef = useRef();
  //--------------------------------
  const [selectedPolygonLayer, setSelectedPolygonLayer] = useState(null);

  /* ---------- Login ------------ */
  const { loggedIn } = useContext(LoginContext);

  /* ------ Country-State-District-City-Airport-Railway-POIs ------ */
  const [countryData, setCountryData] = useState(null);
  const [stateData, setStateData] = useState(null);
  const [districtData, setDistrictData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [airportData, setAirportData] = useState();
  const [railData, setRailData] = useState();
  const [railPlatformData, setRailPlatformData] = useState();
  const [houseNumber, setHouseNumber] = useState([]);
  const [buildingsData, selectedBuildingsData] = useState([]);
  const [poiData, setPoiData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  const baseUrl = "https://vumap.s3.ap-south-1.amazonaws.com";
  const getZipData = async (response, file) => {
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(response.data);
    // Assuming your GeoJSON file is named "boundary.geojson" within the ZIP
    const geojsonStr = await zipFile.file(file).async("string");
    const geojsonData = JSON.parse(geojsonStr);
    return geojsonData;
  };
  /* ----- Countries ----- */
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/boundary_${countryView}.zip`,
          { responseType: "arraybuffer" }
        );
        const getBoundaryData = await getZipData(
          response,
          `boundary_${countryView}.geojson`
        );
        const responseAirport = await axios.get(
          `${baseUrl}/${countryView}/Airport.geojson`
        );

        setCountryData(getBoundaryData);
        setAirportData(responseAirport.data);
      } catch (error) {
        console.error("Error fetching Country Boundary:", error);
      }
    };

    if (countryView) {
      setZoomLevel(5);
    }

    fetchCountryData();
  }, [countryView]);

  /* ----- States ----- */

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/boundary_${stateView}.zip`,
          { responseType: "arraybuffer" }
        );
        const getBoundaryData = await getZipData(
          response,
          `boundary_${stateView}.geojson`
        );
        const statePositionVal =
          getBoundaryData.features[0].geometry.coordinates[0].flat()[0];

        setStateData(getBoundaryData);

        setCenterPosition([statePositionVal[1], statePositionVal[0]]);
      } catch (error) {
        console.error("Error fetching State Boundary:", error);
      }
    };
    const fetchRailData = async () => {
      try {
        const responseRail = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/railline_${stateView}.zip`,
          { responseType: "arraybuffer" }
        );
        const geojsonData = await getZipData(
          responseRail,
          `railline_${stateView}.geojson`
        );
        setRailData(geojsonData);
      } catch (error) {
        console.error("Error fetching rail Data:", error);
      }
    };
    const fetchRailPlatformData = async () => {
      try {
        const responseRailPlatform = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/railwayplatform_${stateView}.zip`,
          { responseType: "arraybuffer" }
        );
        const getBoundaryData = await getZipData(
          responseRailPlatform,
          `railwayplatform_${stateView}.geojson`
        );

        setRailPlatformData(getBoundaryData);
      } catch (error) {
        console.error("Error fetching rail platform data:", error);
      }
    };
    if (stateView) {
      setZoomLevel(6);
    }
    if (stateView?.length > 0) {
      fetchStateData();
      fetchRailData();
      fetchRailPlatformData();
    }
  }, [stateView]);
  /* ----- Districts ----- */
  // console.log(railPlatformData);
  useEffect(() => {
    const fetchDistrictData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/boundary_${districtView}.zip`,
          { responseType: "arraybuffer" }
        );
        const getBoundaryData = await getZipData(
          response,
          `boundary_${districtView}.geojson`
        );
        const districtPositionVal =
          getBoundaryData.features[0].geometry.coordinates[0].flat()[0];

        setDistrictData(getBoundaryData);

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
  }, [countryView, stateView, districtView]);

  /* ----- Cities ----- */

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/boundary_${cityView}.zip`,
          { responseType: "arraybuffer" }
        );
        const getBoundaryData = await getZipData(
          response,
          `boundary_${cityView}.geojson`
        );
        const cityPositionVal =
          getBoundaryData.features[0].geometry.coordinates[0].flat()[0];
        setCenterPosition([cityPositionVal[1], cityPositionVal[0]]);
        setCityData(getBoundaryData);
      } catch (error) {
        console.error("Error fetching City Boundary:", error);
      }
    };
    const fetchPOIData = async () => {
      try {
        const responsePoi = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/POI_${cityView}.zip`,
          { responseType: "arraybuffer" }
        );
        const geojsonData = await getZipData(
          responsePoi,
          `POI_${cityView}.geojson`
        );

        setPoiData(geojsonData);
      } catch (error) {
        console.error("Error fetching POI Data:", error);
      }
    };
    const fetchHouseNumber = async () => {
      try {
        const responsePoi = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/housenumber_${cityView}.zip`,
          { responseType: "arraybuffer" }
        );
        const getBoundaryData = await getZipData(
          responsePoi,
          `housenumber${cityView}.geojson`
        );

        setHouseNumber(getBoundaryData);
      } catch (error) {
        console.error("Error fetching Housing Number:", error);
      }
    };

    if (cityView) {
      setZoomLevel(11);
    }

    if (cityView?.length > 0) {
      fetchCitiesData();
      fetchPOIData();
      fetchHouseNumber();
    }
  }, [cityView?.length > 0]);

  /* --------------------------------------- */

  /* -------- Airport Data ------- */
  const filteredAirports = airportData?.features.filter((airport) =>
    selectedAirportTypes?.some((type) =>
      airport.properties["Airport Type"].includes(type)
    )
  );

  /* ---- Railway Platform Data ---- */
  const filteredPlatform = railPlatformData?.features?.filter(
    (platform) => platform.properties.IDPRIM
  );

  /* ----- House Number Data ----- */
  const filteredHouseNum = houseNumber?.features?.filter(
    (houseNum) => houseNum.properties.IDPRIM
  );

  /* --------- POI Data ---------- */
  const filteredPOI = poiData?.features?.filter((poi) => {
    const category = poi.properties.Category;
    const subCategory = poi.properties.SubCategory;

    // Check if the category is selected
    if (selectedPoiTypes[0]?.hasOwnProperty(category)) {
      // Check if the subcategory is selected
      if (selectedPoiTypes[0][category]?.includes(subCategory)) {
        return true;
      }
    }

    return false;
  });
  /* ------- Stored Filter Data in totalData ------- */

  useEffect(() => {
    const getData = () => {
      let newData = [];
      if (selectedAirportTypes.length > 0) {
        newData = [...newData, ...filteredAirports];
      }
      if (selectedRailTypes.length > 0) {
        newData = [...newData, ...filteredPlatform];
      }
      if (homeSelected === true) {
        newData = [...newData, ...filteredHouseNum];
      }
      if (selectedPoiTypes.length > 0) {
        newData = [...newData, ...filteredPOI];
      }

      setTotalData(newData);
      setMarkersInsidePolygon(newData);
    };
    getData();
  }, [selectedAirportTypes, selectedPoiTypes, selectedRailTypes, homeSelected]);

  /* ---------- Custom Marker Style ------------ */

  const CustomMarker = ({ position, text }) => (
    <Marker
      position={position}
      icon={L.divIcon({ className: "custom-label", html: text })}
    />
  );

  const countryCornersStyle = {
    radius: 5,
    fillColor: "transparent",
    color: "blue",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
    pmIgnore: true,
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
    pmIgnore: true,
  };

  const airportIcon = new L.Icon({
    iconUrl: "images/airport.webp",
    iconSize: [32, 32],
    popupAnchor: [0, -10],
  });

  const platformIcon = new L.Icon({
    iconUrl: "images/railway_platform.webp",
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
    pmIgnore: true,
  };
  const [editableFG, setEditableFG] = useState(null);

  useEffect(() => {
    if (selectedPolygonLayer) {
      const bounds = selectedPolygonLayer.getBounds();
      const filteredMarkers = totalData.filter((marker) => {
        const coordinates = L.latLng(
          marker.geometry.coordinates[1],
          marker.geometry.coordinates[0]
        );
        return bounds.contains(coordinates);
      });
      setMarkersInsidePolygon(filteredMarkers);
    }
  }, [selectedPolygonLayer, totalData, editableFG]);

  const onPolygonCreate = (event) => {
    const { layer } = event;
    setSelectedPolygonLayer(layer);
  };
  const onFeatureGroupReady = (reactFGref) => {
    // store the featureGroup ref for future access to content
    setSelectedPolygonLayer(reactFGref);
  };

  /* ------------------------------------------- */
  return (
    <div style={{ pointerEvents: loggedIn ? "auto" : "none" }}>
      <MapContainer
        key={centerPosition}
        center={centerPosition}
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
            key="raillines"
            data={railData}
            style={railLineStyle}
            onEachFeature={(feature, layer) => {
              layer.bindPopup(feature.properties.name);
            }}
          />
        )}

        {/* Render markers for filtered airports */}
        {homeSelected && (
          <MarkerClusterGroup disableClusteringAtZoom={18}>
            {houseNumber?.features?.map((houseNumber, index) => (
              <CustomMarker
                key={houseNumber + index}
                position={[
                  houseNumber.geometry.coordinates[1],
                  houseNumber.geometry.coordinates[0],
                ]}
                text={houseNumber.properties.streetname} // Text content is the house number
              />
            ))}
          </MarkerClusterGroup>
        )}
        <MarkerClusterGroup disableClusteringAtZoom={18}>
          {buildingTypes?.length > 0 &&
            selectedBuildingsData?.features?.map((houseNumber, index) => (
              <CustomMarker
                key={index}
                position={[
                  houseNumber?.geometry?.coordinates[1],
                  houseNumber?.geometry?.coordinates[0],
                ]}
                text={houseNumber.properties.streetname} // Text content is the house number
              />
            ))}
        </MarkerClusterGroup>
        <MarkerClusterGroup>
          {filteredAirports?.map((airport, index) => (
            <Marker
              key={airport.properties["Airport Name"]}
              icon={airportIcon}
              position={[
                airport?.properties?.Longitude,
                airport?.properties?.Latitude,
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
        </MarkerClusterGroup>

        {/* markers for filtered railway platforms */}

        {selectedRailTypes.includes("Platforms") && (
          <MarkerClusterGroup>
            {railPlatformData?.features?.map((airport, index) => (
              <Marker
                key={index}
                icon={platformIcon}
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
        {selectedPoiTypes.length > 0 && (
          <MarkerClusterGroup disableClusteringAtZoom={18}>
            {filteredPOI?.map((poi, index) => (
              <Marker
                key={`${poi.properties.streetname}-${index}`}
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
        )}

        <FeatureGroup key={centerPosition + 1}>
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
            ref={(featureGroupRef) => {
              onFeatureGroupReady(featureGroupRef);
            }}
            onCreated={onPolygonCreate}
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
