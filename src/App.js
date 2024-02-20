import { useState } from "react";
import { LoginProvider } from "./context/LoginContext";
import "./style/style.css";
import { Suspense, lazy } from "react";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";
import airportData from "./data/Transports/Airports/Airports.json";
import poiData from "./data/All_POI.json";

const { Content } = Layout;
const SideBar = lazy(() => import("./components/SideBar"));

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [markersInsidePolygon, setMarkersInsidePolygon] = useState([]); // Track selected polygon data
  const [centerPosition, setCenterPosition] = useState([20.5937, 78.9629]);
  //--> For Map Switch
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  //-->For Airports
  const [selectedAirportTypes, setSelectedAirportTypes] = useState([]);
  //-->For POI's
  const [selectedPoiTypes, setSelectedPoiTypes] = useState([]);

  /* ------------------------------------------ */

  // Function to handle user login
  const handleLogin = () => {
    // Logic to handle user login
    setLoggedIn(true);
  };

  /* State to manage the visibility of the map tile layer */

  const handleToggleMapLayerVisibility = (isVisible) => {
    setIsMapLayerVisible(isVisible);
  };
  /* ------------------------------------------ */

  const handleCountryChange = (countryItem) => {
    console.log(countryItem);
    setSelectedCountry(countryItem);
  };

  const handleStateChange = (stateItem) => {
    console.log(stateItem);
    setSelectedState(stateItem);
  };

  const handleDistrictChange = (districtItem) => {
    console.log(districtItem);
    setSelectedDistrict(districtItem);
  };

  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ background: "#fff" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <LoginProvider>
              <SideBar
                loggedIn={loggedIn}
                onLogin={handleLogin}
                onToggleMapLayerVisibility={handleToggleMapLayerVisibility}
                onSelectedCountry={handleCountryChange}
                onSelectedState={handleStateChange}
                onSelectedDistrict={handleDistrictChange}
                markersInsidePolygon={markersInsidePolygon}
                setMarkersInsidePolygon={setMarkersInsidePolygon}
                selectedAirportTypes={selectedAirportTypes}
                onAirportTypeChange={(types) => setSelectedAirportTypes(types)}
                selectedPoiTypes={selectedPoiTypes}
                onPoiTypesChange={(types) => setSelectedPoiTypes(types)}
              />
            </LoginProvider>
          </Suspense>
          <Content className="overflow-hidden">
            <OpenMap
              isMapLayerVisible={isMapLayerVisible}
              mapData={centerPosition}
              countryView={selectedCountry}
              stateView={selectedState}
              districtView={selectedDistrict}
              selectedAirportTypes={selectedAirportTypes}
              markersInsidePolygon={markersInsidePolygon}
              setMarkersInsidePolygon={setMarkersInsidePolygon}
              airportDataView={airportData}
              selectedPoiTypes={selectedPoiTypes}
              poiDataView={poiData}
            />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;
