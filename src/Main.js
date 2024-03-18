import HeaderCompo from "./components/HeaderCompo";
import Help from "./components/Help";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";
import "./style/style.scss";

function Main() {
  return (
    <div>
      <LoginProvider>
        <HeaderCompo />
        <Outlet />
        <Help />
        <Footer />
      </LoginProvider>
    </div>
  );
}

export default Main;
