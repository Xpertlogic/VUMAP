import { Footer } from "antd/es/layout/layout";
import HeaderCompo from "./components/HeaderCompo";
import { Outlet } from "react-router-dom";
// import Subscription from "./components/Subscription";

function Main() {
  return (
    <>
      <HeaderCompo />
      <Outlet />
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
      {/* <Subscription /> */}
    </>
  );
}

export default Main;
