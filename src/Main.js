import HeaderCompo from "./components/HeaderCompo";
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
      </LoginProvider>
      <Outlet />
      <Footer />
      {/* <SubscribeProvider>
        <Subscription />
      </SubscribeProvider> */}
    </>
  );
}

export default Main;
