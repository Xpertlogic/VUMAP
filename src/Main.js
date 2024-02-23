import { Footer } from "antd/es/layout/layout";
import HeaderCompo from "./components/HeaderCompo";
import { Outlet } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";

function Main() {
  return (
    <>
      <LoginProvider>
        <HeaderCompo />
      </LoginProvider>
      <Outlet />
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
    </>
  );
}

export default Main;
