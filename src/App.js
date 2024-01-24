import { useState } from "react";
import "./style/style.css";
import { Suspense, lazy } from "react";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";
import airportData from "./data/Transports/Airports/Airports.json";

const { Content, Footer } = Layout;
const HeaderCompo = lazy(() => import("./components/HeaderCompo"));
const SideBar = lazy(() => import("./components/SideBar"));

function App() {
  const [centerPosition, setCenterPosition] = useState([20.5937, 78.9629]);
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();

  /* --------------- for Airport ------------- */
  const [selectedAirportTypes, setSelectedAirportTypes] = useState([]);

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

  /* ---- Transport ---- */

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderCompo />
      </Suspense>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ background: "#fff" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar
              onSelectedCountry={handleCountryChange}
              onSelectedState={handleStateChange}
              onSelectedDistrict={handleDistrictChange}
              selectedAirportTypes={selectedAirportTypes}
              onAirportTypeChange={(types) => setSelectedAirportTypes(types)}
            />
          </Suspense>
          <Content className="overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
              <OpenMap
                mapData={centerPosition}
                countryView={selectedCountry}
                stateView={selectedState}
                districtView={selectedDistrict}
                selectedAirportTypes={selectedAirportTypes}
                airportDataView={airportData}
              />
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
    </Layout>
  );
}

export default App;
