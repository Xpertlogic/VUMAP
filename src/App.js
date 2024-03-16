import { useState } from "react";
import { Suspense, lazy } from "react";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";

const { Content } = Layout;
const SideBar = lazy(() => import("./components/SideBar"));

function App() {
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  //-->For Airports
  const [selectedAirportTypes, setSelectedAirportTypes] = useState([]);
  const [selectedRoadTypes, setSelectedRoadTypes] = useState([]);

  //-->For Railways
  const [selectedRailTypes, setSelectedRailTypes] = useState([]);
  //-->For POI's
  const [selectedPoiTypes, setSelectedPoiTypes] = useState([]);
  const [selectedBuildingTypes, setSelectedBuildingTypes] = useState([]);

  //--> Track selected polygon data
  const [markersInsidePolygon, setMarkersInsidePolygon] = useState([]);
  //--> For Map Switch
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(true);
  const [homeSelected, setHomeSelected] = useState(false);
  // console.log(markersInsidePolygon);
  /* ------------------------------------------ */

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
    <Layout>
      <Content className="container">
        <Layout style={{ background: "#fff" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar
              onToggleMapLayerVisibility={handleToggleMapLayerVisibility}
              onSelectedCountry={handleCountryChange}
              onSelectedState={handleStateChange}
              onSelectedDistrict={handleDistrictChange}
              onSelectedCity={handleCityChange}
              markersInsidePolygon={markersInsidePolygon}
              setMarkersInsidePolygon={setMarkersInsidePolygon}
              selectedAirportTypes={selectedAirportTypes}
              selectedRoadTypes={(types) => setSelectedRoadTypes(types)}
              onBuildingTypeChange={(types) => setSelectedBuildingTypes(types)}
              onAirportTypeChange={(types) => setSelectedAirportTypes(types)}
              onRailTypeChange={(types) => setSelectedRailTypes(types)}
              selectedPoiTypes={selectedPoiTypes}
              homeSelected={(value) => setHomeSelected(value)}
              onPoiTypesChange={(types) => setSelectedPoiTypes(types)}
            />
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
              selectedRoads={selectedRoadTypes}
              buildingTypes={selectedBuildingTypes}
              homeSelected={homeSelected}
            />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
}

export default App;
