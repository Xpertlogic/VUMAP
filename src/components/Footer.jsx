import { Link, useLocation } from "react-router-dom";
import SocialMedia from "./SocialMedia";

const Footer = () => {
  const location = useLocation();
  return (
    <footer>
      <section className="footer-section container">
        <div className="footer-logo">
          <p>GISMAPSLAYERS</p>
        </div>

        <ul className="footer-link">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>
          <li
            className={location.pathname === "/terms&condition" ? "active" : ""}
          >
            <Link to="/terms&condition">Terms & Condition</Link>
          </li>
          <li
            className={
              location.pathname === "/privacy&cancellation" ? "active" : ""
            }
          >
            <Link to="/privacy&cancellation">Privacy & Cancellation</Link>
          </li>
        </ul>

        <div>
          <SocialMedia />
        </div>
      </section>
      <div className="footer-bottom">
        <p>&copy; VUMTECH DESIGN AND GEOSPATIAL PRIVATE LIMITED 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
