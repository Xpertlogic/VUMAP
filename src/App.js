import "./style/style.css";
import { Layout } from "antd";
import OpenMap from "./components/OpenMap";
import HeaderCompo from "./components/HeaderCompo";
import SideBar from "./components/SideBar";
const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <HeaderCompo />
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ background: "#fff" }}>
          <SideBar />
          <Content className="overflow-hidden">
            <OpenMap />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
    </Layout>
  );
}

export default App;
