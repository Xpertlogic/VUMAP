import { useState } from "react";
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
  //--> For Map Switch
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  //-->For Airports
  const [selectedAirportTypes, setSelectedAirportTypes] = useState([]);
  //-->For POI's
  const [selectedPoiTypes, setSelectedPoiTypes] = useState([]);

  /* ------------------------------------------ */

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
            <SideBar
              onToggleMapLayerVisibility={handleToggleMapLayerVisibility}
              onSelectedCountry={handleCountryChange}
              onSelectedState={handleStateChange}
              onSelectedDistrict={handleDistrictChange}
              selectedAirportTypes={selectedAirportTypes}
              onAirportTypeChange={(types) => setSelectedAirportTypes(types)}
              selectedPoiTypes={selectedPoiTypes}
              onPoiTypesChange={(types) => setSelectedPoiTypes(types)}
            />
          </Suspense>
          <Content className="overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
              <OpenMap
                isMapLayerVisible={isMapLayerVisible}
                mapData={centerPosition}
                countryView={selectedCountry}
                stateView={selectedState}
                districtView={selectedDistrict}
                selectedAirportTypes={selectedAirportTypes}
                airportDataView={airportData}
                selectedPoiTypes={selectedPoiTypes}
                poiDataView={poiData}
              />
            </Suspense>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;
