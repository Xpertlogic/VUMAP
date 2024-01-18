import { useState } from "react";
import "./style/style.css";
import { Suspense, lazy } from "react";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";

const { Content, Footer } = Layout;
const HeaderCompo = lazy(() => import("./components/HeaderCompo"));
const SideBar = lazy(() => import("./components/SideBar"));
function App() {
  const [centerPosition, setCenterPosition] = useState([20.5937, 78.9629]);
  const [selectedState, setSelectedState] = useState(null);

  const handleStateChange = (stateItem) => {
    console.log(stateItem)
    setSelectedState(stateItem);
  };

  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderCompo />
      </Suspense>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ background: "#fff" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar onSelected={handleStateChange} />
          </Suspense>
          <Content className="overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
              <OpenMap mapData={centerPosition} stateView={selectedState} />
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
    </Layout>
  );
}

export default App;
