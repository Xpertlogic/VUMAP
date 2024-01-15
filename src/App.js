import { useState } from "react";
import "./style/style.css";
import { Suspense, lazy } from "react";
import { Layout } from "antd";

const { Content, Footer } = Layout;

const HeaderCompo = lazy(() => import("./components/HeaderCompo"));
const SideBar = lazy(() => import("./components/SideBar"));
const OpenMap = lazy(() => import("./components/OpenMap"));

function App() {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateChange = (stateItem) => {
    setSelectedState(stateItem);
  };
  console.log(selectedState)
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <HeaderCompo />
      </Suspense>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ background: "#fff" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar onStateChange={handleStateChange} />
          </Suspense>
          <Content className="overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
              <OpenMap state={selectedState} />
            </Suspense>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
    </Layout>
  );
}

export default App;
