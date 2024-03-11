import HeaderCompo from "./components/HeaderCompo";
import Help from "./components/Help";
import Footer from "./components/Footer";
import "./style/style.scss";
import { Outlet } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
// import { SubscribeProvider } from "./context/SubscribeContext";
// import Subscription from "./components/Subscription";

function Main() {
  return (
    <>
      <LoginProvider>
        <HeaderCompo />
        <Outlet />
        <Help />
        <Footer />
      </LoginProvider>
      {/* <SubscribeProvider>
        <Subscription />
      </SubscribeProvider> */}
    </>
  );
}

export default Main;
