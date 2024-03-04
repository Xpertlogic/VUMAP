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
import {
  HomeTwoTone,
} from '@ant-design/icons';
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
  buildingTypes,
  selectedRoads,
  homeSelected
}) {
  const [centerPosition, setCenterPosition] = useState([22.8046, 86.2029]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const featureGroupRef = useRef();
  //--------------------------------
  const [selectedPolygonLayer, setSelectedPolygonLayer] = useState(null);

  /* ---------- Login ------------ */

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
  const [totalData, setTotalData] = useState([]);
  const [poiData, setPoiData] = useState([]);

  const baseUrl = "https://vumap.s3.ap-south-1.amazonaws.com";
  /* ----- Countries ----- */
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/boundary.geojson`
        );
        const responseAirport = await axios.get(
          `${baseUrl}/${countryView}/Airport.geojson`
        );

        setCountryData(response.data);
        setAirportData(responseAirport.data);
      } catch (error) {
        console.error("Error fetching Country Boundary:", error);
      }
    };

    if (countryView) {
      setZoomLevel(5);
    }

    // fetchRailData();
    // fetchRailPlatformData();
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
    const fetchRailData = async () => {
      try {
        const responseRail = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/Railline.zip`,
          { responseType: "arraybuffer" }
        );

        const zip = new JSZip();
        const zipFile = await zip.loadAsync(responseRail.data);
        // Assuming your GeoJSON file is named "boundary.geojson" within the ZIP
        const geojsonStr = await zipFile
          .file("Railline_Odisha.geojson")
          .async("string");
        const geojsonData = JSON.parse(geojsonStr);

        setRailData(geojsonData);
      } catch (error) {
        console.error("Error fetching rail Data:", error);
      }
    };
    const fetchRailPlatformData = async () => {
      try {
        const responseRailPlatform = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/Railwayplatform.zip`,
          { responseType: "arraybuffer" }
        );

        const zip = new JSZip();
        const zipFile = await zip.loadAsync(responseRailPlatform.data);
        const geojsonStr = await zipFile
          .file("Railwayplatform_Odisha.geojson")
          .async("string");
        const geojsonData = JSON.parse(geojsonStr);

        setRailPlatformData(geojsonData);
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
  }, [countryView, stateView, districtView]);

  /* ----- Cities ----- */

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/boundary.geojson`
        );

        const cityPositionVal = response.data.features[0].geometry.coordinates[0].flat()[0];
        setCenterPosition([cityPositionVal[1], cityPositionVal[0]]);
        setCityData(response.data);
      } catch (error) {
        console.error("Error fetching City Boundary:", error);
      }
    };
    const fetchPOIData = async () => {
      try {
        const responsePoi = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/POI.zip`,
          { responseType: "arraybuffer" }
        );

        const zip = new JSZip();
        const zipFile = await zip.loadAsync(responsePoi.data);
        const geojsonStr = await zipFile
          .file("POI.geojson")
          .async("string");
        const geojsonData = JSON.parse(geojsonStr);

        setPoiData(geojsonData);
      } catch (error) {
        console.error("Error fetching POI Data:", error);
      }
    }
    const fetchHouseNumber = async () => {
      try {
        const responsePoi = await axios.get(
          `${baseUrl}/${countryView}/${stateView}/${districtView}/${cityView}/HouseNumber.zip`,
          { responseType: "arraybuffer" }
        );

        const zip = new JSZip();
        const zipFile = await zip.loadAsync(responsePoi.data);
        const geojsonStr = await zipFile
          .file("HouseNumber.geojson")
          .async("string");
        const geojsonData = JSON.parse(geojsonStr);

        setHouseNumber(geojsonData);
      } catch (error) {
        console.error("Error fetching Housing Number:", error);
      }
    }

    if (cityView) {
      setZoomLevel(11);
    }

    if (cityView?.length > 0) {
      fetchCitiesData();
      fetchPOIData()
      fetchHouseNumber()
    }
  }, [cityView?.length > 0]);
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
    pmIgnore: true
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
    pmIgnore: true
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
    pmIgnore: true
  };
  /* -------------- Airport Data -------------- */
  const filteredAirports = airportData?.features.filter((airport) =>
  selectedAirportTypes.some((type) =>
  airport.properties["Airport Type"].includes(type)
)  );
  console.log(filteredAirports)

  /* ------------------------------------------- */
  /* -------------- POI Data -------------- */
  const filteredPOI = poiData?.features?.filter(poi => {
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
  console.log(filteredAirports)
  // useEffect(() => {
  //   const getData = () => {
  //     let newData = [];
  //     if(selectedAirportTypes.length > 0){
  //       newData = [...newData, ...filteredAirports];
  //     }
  //     if(selectedPoiTypes.length > 0){
  //       newData =[...newData, ...filteredPOI];
  //     }
  //     setTotalData(newData)
  //   }
  //   getData()
  // }, [selectedAirportTypes, selectedPoiTypes]);
  console.log(totalData);
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

    // ----------------
    setSelectedPolygonLayer(layer);
    setMarkersInsidePolygon([]); // Reset markers inside polygon when new polygon is drawn

    const bounds = layer.getBounds();
    const filteredMarkers = [];
    filteredPOI.forEach((airport) => {
      const coordinates = L.latLng(
        airport.geometry.coordinates[1],
        airport.geometry.coordinates[0]
      );
      if (bounds.contains(coordinates)) {
        filteredMarkers.push(airport); 
      }
    });
      console.log(filteredMarkers,"filtered markers")
      setMarkersInsidePolygon(filteredMarkers);
  };

  // console.log(markersInsidePolygon);

  
  // const filteredPois = poiData?.features?.filter((poi) =>
  //   selectedPoiTypes.includes(poi.properties.SubCategory)
  // );
  const CustomMarker = ({ position, text }) => (
    <Marker position={position} icon={L.divIcon({ className: 'custom-label', html: text })} />
  );
  console.log(filteredPOI)
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
        {homeSelected &&
          <MarkerClusterGroup disableClusteringAtZoom={18} >

            {houseNumber?.features
              ?.map((houseNumber, index) => (
                <CustomMarker
                  key={houseNumber}
                  position={[
                    houseNumber.geometry.coordinates[1],
                    houseNumber.geometry.coordinates[0],
                  ]}
                  text={houseNumber.properties.streetname} // Text content is the house number
                />
              ))}
          </MarkerClusterGroup>
        }
        <MarkerClusterGroup disableClusteringAtZoom={18} >

          {buildingTypes?.length > 0 && selectedBuildingsData?.features
            ?.map((houseNumber, index) => (
              <CustomMarker
                key={houseNumber.properties.streetname}
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
        {selectedPoiTypes.length > 0 &&
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
        }
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
