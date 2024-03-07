import { Link, useLocation } from "react-router-dom";
import {
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";

const Footer = () => {
  const location = useLocation();
  return (
    <footer>
      <section className="footer-section container">
        <div className="footer-logo">
          <p>Vumtech</p>
        </div>
        <div className="footer-link">
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
        </div>
        <div className="social-media-link">
          <li>
            <a href="/" target="_blank">
              <FacebookFilled className="social-icon facebook-icon" />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <LinkedinFilled className="social-icon linkedin-icon" />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <YoutubeFilled className="social-icon youtube-icon" />
            </a>
          </li>
          <li>
            <a href="/" target="_blank">
              <InstagramFilled className="social-icon instagram-icon" />
            </a>
          </li>
        </div>
      </section>
      <div className="footer-bottom">
        <p>&copy; Vumtech 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
