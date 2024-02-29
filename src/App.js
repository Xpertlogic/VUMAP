import { useState, useEffect, useContext } from "react";
import { LoginContext, LoginProvider } from "./context/LoginContext";
import { SubscribeProvider } from "./context/SubscribeContext";
import "./style/style.css";
import { Suspense, lazy } from "react";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";
import airportData from "./data/Transports/Airports/Airports.json";
import poiData from "./data/All_POI.json";

const { Content } = Layout;
const SideBar = lazy(() => import("./components/SideBar"));

function App() {
  const [centerPosition, setCenterPosition] = useState([20.5937, 78.9629]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  //-->For Airports
  const [selectedAirportTypes, setSelectedAirportTypes] = useState([]);
  //-->For POI's
  const [selectedPoiTypes, setSelectedPoiTypes] = useState([]);
  //--> Track selected polygon data
  const [markersInsidePolygon, setMarkersInsidePolygon] = useState([]);
  //--> For Map Switch
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(true);

  /* ------------------------------------------ */

  // const { loggedIn } = useContext(LoginContext);

  // Function to handle user login
  // const handleLogin = async () => {
  //   // Logic to handle user login
  //   setLoggedIn(true);
  // };

  /* State to manage the visibility of the map tile layer */

  const handleToggleMapLayerVisibility = (isVisible) => {
    setIsMapLayerVisible(isVisible);
  };
  /* ------------------------------------------ */

  const handleCountryChange = (countryItem) => {
    setSelectedCountry(countryItem);
    setSelectedState(null);
    setSelectedDistrict(null);
    setSelectedCity(null);
    console.log("change", countryItem);
  };

  const handleStateChange = (stateItem) => {
    setSelectedState(stateItem);
    setSelectedDistrict(null);
    setSelectedCity(null);
    console.log("change", stateItem);
  };

  const handleDistrictChange = (districtItem) => {
    setSelectedDistrict(districtItem);
    setSelectedCity(null);
    console.log("change", districtItem);
  };

  const handleCityChange = (cityItem) => {
    setSelectedCity(cityItem);
    console.log("change", cityItem);
  };

  return (
    <LoginProvider>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ background: "#fff" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <SubscribeProvider>
                <SideBar
                  onToggleMapLayerVisibility={handleToggleMapLayerVisibility}
                  onSelectedCountry={handleCountryChange}
                  onSelectedState={handleStateChange}
                  onSelectedDistrict={handleDistrictChange}
                  onSelectedCity={handleCityChange}
                  markersInsidePolygon={markersInsidePolygon}
                  setMarkersInsidePolygon={setMarkersInsidePolygon}
                  selectedAirportTypes={selectedAirportTypes}
                  onAirportTypeChange={(types) =>
                    setSelectedAirportTypes(types)
                  }
                  selectedPoiTypes={selectedPoiTypes}
                  onPoiTypesChange={(types) => setSelectedPoiTypes(types)}
                />
              </SubscribeProvider>
            </Suspense>
            <Content className="overflow-hidden">
              <OpenMap
                isMapLayerVisible={isMapLayerVisible}
                mapData={centerPosition}
                countryView={selectedCountry}
                stateView={selectedState}
                districtView={selectedDistrict}
                cityView={selectedCity}
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
    </LoginProvider>
  );
}

export default App;
