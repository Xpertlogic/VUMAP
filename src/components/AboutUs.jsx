import { lazy } from "react";
import "../style/style.scss";
import { Suspense } from "react";

const UpdateBox = lazy(() => import("./UpdateBox"));

function AboutUs() {
  return (
    <section className="about-section container">
      <h1 className="heading-h1 slideInDownAnimation">About Us</h1>
      <div className="about-box">
        <div className="left-box">
          <div className="about-heading slideInUpAnimation">
            <h2># ABOUT GIS MAPS LAYERS </h2>
            <p>
              <strong>GIS MAPS LAYERS</strong> are composed of various layers of
              spatial data that provide information about geographic features,
              locations, and attributes. Each layer in a GIS map represents a
              specific type of data, such as roads, POI, House Number,
              Buildings, etc. It helps you create customized Geo Enabled
              Platforms/Applications.
              <p>Easily users can download and use it for their product.</p>
            </p>
          </div>
          <div className="about-feature slideInUpAnimation">
            <h3>Features</h3>
            <ol>
              <li>
                <p>
                  1- Latest and correct leads with all information (Websites,
                  Contact number and etc.)
                </p>
              </li>
              <li>
                <p>2- Visualize all layers</p>
              </li>
              <li>
                <p>3- Download the latest and correct GIS layers</p>
              </li>
              <li>
                <p>4- Analysis your area</p>
              </li>
              <li>
                <p>5- Route Analysis</p>
              </li>
              <li>
                <p>6- Get Customizes Maps</p>
              </li>
            </ol>
          </div>

          <div className="about-data-sets slideInUpAnimation">
            <h2># Data Sets :-</h2>
            <ul>
              <li>
                <h3>Administrative Boundaries</h3>
                <li>
                  <p>1- Country Boundary</p>
                </li>
                <li>
                  <p>2- State Boundary</p>
                </li>
                <li>
                  <p>3- District Boundary</p>
                </li>
                <li>
                  <p>4- Postal Boundary</p>
                </li>
                <li>
                  <p>5- Locality Boundary</p>
                </li>
                <li>
                  <p>6- Village Boundary</p>
                </li>
                <li>
                  <p>7- Plot label Boundary</p>
                </li>
              </li>
              <li>
                <h3>Transports</h3>
                <li>
                  <p>1- Networks (Roads, Rails, etc.)</p>
                </li>
                <li>
                  <p>
                    2- Stations (Rail stations, Airports, Toll Gate/Plaza
                    information, Bridges, Tunnel, etc.)
                  </p>
                </li>
                <li>
                  <p>3- Road Signs</p>
                </li>
              </li>

              <li>
                <h3>Buildings</h3>
              </li>
              <li>
                <h3>House Number</h3>
              </li>
              <li>
                <h3>POI (All categories’ POIs)</h3>
              </li>
            </ul>
          </div>

          <p className="help-paragraph slideInUpAnimation">
            We are here to help you.
          </p>
        </div>

        <div className="right-box">
          <Suspense fallback={<div>Loading...</div>}>
            <UpdateBox />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
