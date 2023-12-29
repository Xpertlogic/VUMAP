import { Link } from "react-router-dom";
import "../style/style.css";

function Header() {
  const handelOpen = () => {
    console.log("clicked");
  };
  return (
    <>
      <header>
        <h1 className="text-center text-[3rem]">VUMAP</h1>
        <div className="nav-box">
          <Link to="/" className="nav-link">
            About Us
          </Link>
          <Link to="/" className="nav-link" onClick={handelOpen}>
            Help
          </Link>
        </div>
      </header>
    </>
  );
}

export default Header;
