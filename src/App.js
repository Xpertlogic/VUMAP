import { useState, useContext, useEffect } from "react";
import { LoginProvider } from "./context/LoginContext";
import { SubscribeProvider } from "./context/SubscribeContext";
import "./style/style.css";
import { Suspense, lazy } from "react";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";
import poiData from "./data/All_POI.json";

const { Content } = Layout;
const SideBar = lazy(() => import("./components/SideBar"));

function App() {
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  //-->For Airports
  const [selectedAirportTypes, setSelectedAirportTypes] = useState([]);
  //-->For Railways
  const [selectedRailTypes, setSelectedRailTypes] = useState([]);
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
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCity("");
  };

  const handleStateChange = (stateItem) => {
    setSelectedState(stateItem);
    setSelectedDistrict("");
    setSelectedCity("");
  };

  const handleDistrictChange = (districtItem) => {
    setSelectedDistrict(districtItem);
    setSelectedCity("");
  };

  const handleCityChange = (cityItem) => {
    setSelectedCity(cityItem);
  };

  return (
    <LoginProvider>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ background: "#fff" }}>
            <Suspense fallback={<div>Loading...</div>}>
              <SubscribeProvider>
                <SideBar
                  // stateData={stateData}
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
                  onRailTypeChange={(types) => setSelectedRailTypes(types)}
                  selectedPoiTypes={selectedPoiTypes}
                  onPoiTypesChange={(types) => setSelectedPoiTypes(types)}
                />
              </SubscribeProvider>
            </Suspense>
            <Content className="overflow-hidden">
              <OpenMap
                isMapLayerVisible={isMapLayerVisible}
                countryView={selectedCountry}
                stateView={selectedState}
                districtView={selectedDistrict}
                cityView={selectedCity}
                selectedAirportTypes={selectedAirportTypes}
                selectedRailTypes={selectedRailTypes}
                markersInsidePolygon={markersInsidePolygon}
                setMarkersInsidePolygon={setMarkersInsidePolygon}
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
