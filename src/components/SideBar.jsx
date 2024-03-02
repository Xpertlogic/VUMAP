import { useEffect, useState, useContext, lazy } from "react";
import { LoginContext } from "../context/LoginContext";
import { SubscribeContext } from "../context/SubscribeContext";
import {
  Layout,
  Menu,
  Select,
  Form,
  Checkbox,
  Button,
  Modal,
  Switch,
} from "antd";
import SelectAllCheckbox from "./SelectAllCheckBox";
const Subscription = lazy(() => import("./Subscription"));

const { SubMenu } = Menu;
const { Sider } = Layout;

const CheckboxGroup = Checkbox.Group;
function SideBar({
  // stateData,
  markersInsidePolygon,
  setMarkersInsidePolygon,
  onToggleMapLayerVisibility,
  onSelectedCountry,
  onSelectedState,
  onSelectedDistrict,
  onSelectedCity,
  onAirportTypeChange,
  onRailTypeChange,
  selectedPoiTypes,
  onPoiTypesChange,
}) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(true);

  /*----------- Select All checkbox ----------*/

  /* --------------- Airport ------------- */

  const [airportData, setAirportData] = useState([]);
  const [checkAirports, setCheckAirports] = useState(false);
  const [checkAllAirport, setCheckAllAirport] = useState(false);

  const airportTypes = ["International", "Domestic", "State/Private"];

  const onChangeAirport = (val) => {
    setAirportData(val);
    setCheckAirports(!!val.length && val.length < airportTypes.length);
    setCheckAllAirport(val.length === airportTypes.length);
    onAirportTypeChange(val);
  };
  const onCheckAllAirport = (e) => {
    setAirportData(e.target.checked ? airportTypes : []);
    setCheckAirports(false);
    setCheckAllAirport(e.target.checked);
    onAirportTypeChange(e.target.checked ? airportTypes : []);
  };

  /* --------------- Railway ------------- */

  const [railData, setRailData] = useState([]);
  const [checkRails, setCheckRails] = useState(false);
  const [checkAllRail, setCheckAllRail] = useState(false);

  const railTypes = ["Rail Line", "Platforms"];

  const onChangeRail = (val) => {
    setRailData(val);
    setCheckRails(!!val.length && val.length < railTypes.length);
    setCheckAllRail(val.length === railTypes.length);
    onRailTypeChange(val);
  };
  const onCheckAllRail = (e) => {
    setRailData(e.target.checked ? railTypes : []);
    setCheckRails(false);
    setCheckAllRail(e.target.checked);
    onRailTypeChange(e.target.checked ? railTypes : []);
  };

  /* --------------- Roads ------------- */

  const [roadData, setRoadData] = useState([]);
  const [checkRoads, setCheckRoads] = useState(false);
  const [checkAllRoad, setCheckAllRoad] = useState(false);

  const roadTypes = [
    "Roads",
    "Tollgates",
    "Tunnel",
    "Fly over",
    "Roads Signs",
    "Parking Area",
  ];

  const onChangeRoad = (val) => {
    setRoadData(val);
    setCheckRoads(!!val.length && val.length < roadTypes.length);
    setCheckAllRoad(val.length === roadTypes.length);
    // onRoadTypeChange(val);
  };
  const onCheckAllRoad = (e) => {
    setRoadData(e.target.checked ? roadTypes : []);
    setCheckRoads(false);
    setCheckAllRoad(e.target.checked);
    // onRoadTypeChange(e.target.checked ? roadTypes : []);
  };

  /* --------------- Buildings ------------- */

  const [buildingData, setBuildingData] = useState([]);
  const [checkBuildings, setCheckBuildings] = useState(false);
  const [checkAllBuilding, setCheckAllBuilding] = useState(false);

  const buildingTypes = ["Residentials", "Commercial"];

  const onChangeBuilding = (val) => {
    setBuildingData(val);
    setCheckBuildings(!!val.length && val.length < buildingTypes.length);
    setCheckAllBuilding(val.length === buildingTypes.length);
    // onBuildingTypeChange(val);
  };
  const onCheckAllBuilding = (e) => {
    setBuildingData(e.target.checked ? buildingTypes : []);
    setCheckBuildings(false);
    setCheckAllBuilding(e.target.checked);
    // onBuildingTypeChange(e.target.checked ? buildingTypes : []);
  };

  /* -------------------- POIs --------------------- */

  /* ------ Automotive Dealer -------- */

  const [autoDealerData, setAutoDealerData] = useState([]);
  const [checkAutoDealers, setCheckAutoDealers] = useState(false);
  const [checkAllAutoDealer, setCheckAllAutoDealer] = useState(false);

  const autoDealerTypes = [
    "Bike",
    "Car",
    "Bus",
    "Truck",
    "Electric Vehicle",
    "Others",
  ];

  const onChangeAutoDealer = (val) => {
    setAutoDealerData(val);
    setCheckAutoDealers(!!val.length && val.length < autoDealerTypes.length);
    setCheckAllAutoDealer(val.length === autoDealerTypes.length);
    // onAutoDealerTypeChange(val);
  };
  const onCheckAllAutoDealer = (e) => {
    setAutoDealerData(e.target.checked ? autoDealerTypes : []);
    setCheckAutoDealers(false);
    setCheckAllAutoDealer(e.target.checked);
    // onAutoDealerTypeChange(e.target.checked ? autoDealerTypes : []);
  };

  /* ----------------------------------------------- */

  /* ----- Countries ----- */

  const handleCountryChange = (value) => {
    setSelectedCountry(value.toLowerCase());
    setSelectedState("");
    setSelectedDistrict("");
    onSelectedCountry(value.toLowerCase());
  };

  /* ----- States ----- */
  const handleStateChange = (value) => {
    setSelectedState(value.toLowerCase());
    setSelectedDistrict("");
    onSelectedState(value.toLowerCase());
  };

  /* ----- Districts ----- */

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value.toLowerCase());
    onSelectedDistrict(value.toLowerCase());
  };

  /* ----- Cities ----- */

  const handleCityChange = (value) => {
    onSelectedCity(value.toLowerCase());
  };

  /* ----------------------------------------------------- */

  const { subscriptionState } = useContext(SubscribeContext);
  /* ---------- Login ------------ */
  const { loggedIn } = useContext(LoginContext);

  /* ---------------------------------- */

  /* ---------- Download Boundary -------- */
  const handleDownloadBoundary = () => {
    const dropboxLink =
      "https://www.dropbox.com/scl/fi/nw4rpd8r2g798i1dtd61a/vumtech_19th.zip?rlkey=drnpsicogdbkhtujr19thavs6&dl=0";
    window.location.href = dropboxLink;
  };

  //----------Polygon Create-----------

  const handleDownloadMarkersInsidePolygon = () => {
    if (subscriptionState.paymentSuccess) {
      if (markersInsidePolygon.length > 0) {
        const geoJSONData = {
          type: "FeatureCollection",
          features: markersInsidePolygon,
        };
        const blob = new Blob([JSON.stringify(geoJSONData)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "markers_inside_polygon.geojson";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } else {
      // Show subscription modal if the user has not subscribed
      setIsSubscriptionModalOpen(true);
    }
  };

  //-------------- For Reset ------------
  const handleReset = () => {
    //
    setSelectedCountry("undefined");
    setSelectedState("undefined");
    setSelectedDistrict("undefined");
  };

  /* ------------Map Switch Layer ------------ */
  const handleMapLayerToggle = () => {
    const newVisibility = !isMapLayerVisible;
    setIsMapLayerVisible(newVisibility);

    if (onToggleMapLayerVisibility) {
      onToggleMapLayerVisibility(newVisibility);
    }
  };

  /* ------------------------------------------------ */

  /* -------- For Subscription ------- */
  // const showSubscriptionModal = () => {
  //   setIsSubscriptionModalOpen(true);
  // };

  const handleCancel = () => {
    setIsSubscriptionModalOpen(false);
  };

  useEffect(() => {
    // Function to prevent right-click on the sidebar when user is not logged in
    const preventRightClick = (event) => {
      if (!loggedIn) {
        event.preventDefault();
      }
    };

    // Function to prevent F12 key when user is not logged in
    const preventF12 = (event) => {
      if (!loggedIn && event.keyCode === 123) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", preventRightClick);
    document.addEventListener("keydown", preventF12);

    return () => {
      document.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("keydown", preventF12);
    };
  }, [loggedIn]);

  return (
    <>
      <Sider
        width={300}
        className="side-bar"
        style={{
          padding: "16px 0",
          background: "#fff",
          overflow: "auto",
          height: "100vh",
          pointerEvents: loggedIn ? "auto" : "none",
        }}
      >
        {/* Checkbox for toggling map tile layer visibility */}
        <div className="flex justify-center mb-[1.5rem]">
          <Switch
            checked={isMapLayerVisible}
            onChange={handleMapLayerToggle}
            checkedChildren="View Map"
            unCheckedChildren="Hide Map"
            style={{
              transform: "transiction: all 0.7s ease",
              backgroundColor: isMapLayerVisible ? "#1677FF" : "#36454f",
              borderColor: isMapLayerVisible ? "red" : "green",
              color: isMapLayerVisible ? "#fff" : "#000",
            }}
          />
        </div>

        {/* ------------- */}

        <Menu mode="inline" style={{ height: "100%" }}>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">Country: </label>
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleCountryChange(value)}
                >
                  <option key="select-state" value="india">
                    India
                  </option>
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">States: </label>
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleStateChange(value)}
                  disabled={selectedCountry?.length < 1}
                >
                  <option key="odisha" value="odisha">
                    Odisha
                  </option>
                  <option key="goa" value="goa">
                    Goa
                  </option>
                  <option key="uttar pradesh" value="uttar pradesh">
                    Uttar Pradesh
                  </option>
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">District:</label>{" "}
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleDistrictChange(value)}
                  disabled={selectedState?.length < 1}
                >
                  <option key="select-district" value={null}>
                    Select District
                  </option>
                  <option key="khordha" value="khordha">
                    Khordha
                  </option>
                  <option key="puri" value="puri">
                    Puri
                  </option>
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">City:</label>{" "}
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleCityChange(value)}
                  disabled={selectedDistrict?.length < 1}
                >
                  <option key="select-city" value={null}>
                    Select City
                  </option>
                  <option key="bhubaneswar" value="bhubaneswar">
                    Bhubaneswar
                  </option>
                </Select>
              </div>
            </div>
          </Form.Item>

          {/* <SubMenu
            key="sub5"
            title={
              <span className="text-[1rem] flex gap-2">
                <Checkbox className=""></Checkbox>
                Administrative Boundaries
              </span>
            }
          >
            <Menu.Item key="1">
              <Checkbox>Country Boundary</Checkbox>
            </Menu.Item>
            <Menu.Item key="2">
              <Checkbox>State Boundary</Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
              <Checkbox>District Boundary</Checkbox>
            </Menu.Item>
            <Menu.Item key="4">
              <Checkbox>Postal Boundary</Checkbox>
            </Menu.Item>
            <Menu.Item key="5">
              <Checkbox>Locality Boundary</Checkbox>
            </Menu.Item>
          </SubMenu> */}

          <SubMenu key="sub11" title="Transports" className="text-[1rem]">
            <SubMenu
              key="airports"
              title={
                <SelectAllCheckbox
                  title="Airports"
                  indeterminate={checkAirports}
                  checkAll={checkAllAirport}
                  onCheckAllChange={onCheckAllAirport}
                />
              }
            >
              <CheckboxGroup
                className="allCheckBox"
                options={airportTypes}
                value={airportData}
                onChange={onChangeAirport}
              />
            </SubMenu>
            <SubMenu
              key="rails"
              title={
                <SelectAllCheckbox
                  title="Rail"
                  indeterminate={checkRails}
                  checkAll={checkAllRail}
                  onCheckAllChange={onCheckAllRail}
                />
              }
            >
              <CheckboxGroup
                className="allCheckBox"
                options={railTypes}
                value={railData}
                onChange={onChangeRail}
              />
            </SubMenu>
            <SubMenu
              key="roads"
              title={
                <SelectAllCheckbox
                  title="Roads"
                  indeterminate={checkRoads}
                  checkAll={checkAllRoad}
                  onCheckAllChange={onCheckAllRoad}
                />
              }
            >
              <CheckboxGroup
                className="allCheckBox"
                options={roadTypes}
                value={roadData}
                onChange={onChangeRoad}
              />
            </SubMenu>
          </SubMenu>
          <SubMenu key="building" title="Buildings" className="text-[1rem]">
            <SubMenu
              key="buildings"
              title={
                <SelectAllCheckbox
                  title="Select all"
                  indeterminate={checkBuildings}
                  checkAll={checkAllBuilding}
                  onCheckAllChange={onCheckAllBuilding}
                />
              }
            >
              <CheckboxGroup
                className="allCheckBox"
                options={buildingTypes}
                value={buildingData}
                onChange={onChangeBuilding}
              />
            </SubMenu>
          </SubMenu>

          <Menu.Item key="house number">
            <Checkbox className="text-[1rem]">House Number</Checkbox>
          </Menu.Item>

          {/* ---- POIs ---- */}
          <SubMenu key="poi" title="POI" className="text-[1rem]">
            {/* ---- Automotive Dealer ---- */}
            <SubMenu
              key="automotive dealer"
              title={
                <SelectAllCheckbox
                  title="Automotive Dealer"
                  indeterminate={checkAutoDealers}
                  checkAll={checkAllAutoDealer}
                  onCheckAllChange={onCheckAllAutoDealer}
                />
              }
            >
              <CheckboxGroup
                className="allCheckBox"
                options={autoDealerTypes}
                value={autoDealerData}
                onChange={onChangeAutoDealer}
              />
            </SubMenu>
            <SubMenu
              key="sub4-2"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Companies
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Private Companies</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-3"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Entertainment
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Café/Pub</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Cinema Hall</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Theatre</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Nightlife</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Bar</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="sub4-4">
              <Checkbox>Golf Course</Checkbox>
            </Menu.Item>
            <SubMenu
              key="sub4-5"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Hotels/Restaurants
                </span>
              }
            >
              {" "}
              <Menu.Item key="1">
                <Checkbox>Hotels</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Restaurants</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-6"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Place of Worship
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Temple</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Church</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Masjid</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Gurudwara</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Ashram</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Mosque</Checkbox>
              </Menu.Item>
              <Menu.Item key="7">
                <Checkbox>Pagoda</Checkbox>
              </Menu.Item>
              <Menu.Item key="8">
                <Checkbox>Community Centre</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-7"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Repair Facility
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Bike</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Cycle</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Car</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="sub4-8">
              <Checkbox>Business Park</Checkbox>
            </Menu.Item>
            <SubMenu
              key="sub4-9"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Education
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>School</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>College/ University</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Anganwadi Centre</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Institutes</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Library</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Other</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-10"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Finance
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>ATM</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Bank</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Loan/Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-11"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Government Office
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Central Government</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>State Government</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>City level Government</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Court House</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Police Station</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Post office</Checkbox>
              </Menu.Item>
              <Menu.Item key="7">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-12"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Health Care
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Government Hospitals</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Private Hospitals</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Clinic</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-13"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Hostels
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Boys Hostel</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Girls Hostel</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Other</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-14"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Park and Recreation Area
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Cemetery</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Park</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Picnic Spot</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Memorial</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-15"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Public Amenity
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Toilet</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Bus stop</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Aadhar Centre/CSC</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Rest Area</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-16"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Services
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Professional Services</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Communication Services</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Other Services</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-17"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Shop
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Pharmacy</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Variety Store</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Travel Agents</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Agricultural Supplies</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Cycle Store</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Animal Services</Checkbox>
              </Menu.Item>
              <Menu.Item key="7">
                <Checkbox>Antique/Art</Checkbox>
              </Menu.Item>
              <Menu.Item key="8">
                <Checkbox>Bags & Leatherwear</Checkbox>
              </Menu.Item>
              <Menu.Item key="9">
                <Checkbox>Beauty Salon</Checkbox>
              </Menu.Item>
              <Menu.Item key="10">
                <Checkbox>Gents Salon</Checkbox>
              </Menu.Item>
              <Menu.Item key="11">
                <Checkbox>Footwear & Shoe Repairs</Checkbox>
              </Menu.Item>
              <Menu.Item key="12">
                <Checkbox>Cloth Store</Checkbox>
              </Menu.Item>
              <Menu.Item key="13">
                <Checkbox>Books Shops</Checkbox>
              </Menu.Item>
              <Menu.Item key="14">
                <Checkbox>Delicatessen</Checkbox>
              </Menu.Item>
              <Menu.Item key="15">
                <Checkbox>Dry cleaners</Checkbox>
              </Menu.Item>
              <Menu.Item key="16">
                <Checkbox>Electricals</Checkbox>
              </Menu.Item>
              <Menu.Item key="17">
                <Checkbox>Electronics</Checkbox>
              </Menu.Item>
              <Menu.Item key="18">
                <Checkbox>Factory Outlet</Checkbox>
              </Menu.Item>
              <Menu.Item key="19">
                <Checkbox>Florists & Puja Vandar</Checkbox>
              </Menu.Item>
              <Menu.Item key="20">
                <Checkbox>Furniture/Home Furnishings</Checkbox>
              </Menu.Item>
              <Menu.Item key="21">
                <Checkbox>Glassware/Ceramic</Checkbox>
              </Menu.Item>
              <Menu.Item key="22">
                <Checkbox>Hardware</Checkbox>
              </Menu.Item>
              <Menu.Item key="23">
                <Checkbox>House & Garden</Checkbox>
              </Menu.Item>
              <Menu.Item key="24">
                <Checkbox>Jewelry</Checkbox>
              </Menu.Item>
              <Menu.Item key="25">
                <Checkbox>Clocks & Watches</Checkbox>
              </Menu.Item>
              <Menu.Item key="26">
                <Checkbox>Mobile Phone</Checkbox>
              </Menu.Item>
              <Menu.Item key="27">
                <Checkbox>Opticians</Checkbox>
              </Menu.Item>
              <Menu.Item key="28">
                <Checkbox>Photo Lab/Development</Checkbox>
              </Menu.Item>
              <Menu.Item key="29">
                <Checkbox>Photocopy</Checkbox>
              </Menu.Item>
              <Menu.Item key="30">
                <Checkbox>Sports Equipment & Clothing</Checkbox>
              </Menu.Item>
              <Menu.Item key="31">
                <Checkbox>Recycling Shop</Checkbox>
              </Menu.Item>
              <Menu.Item key="32">
                <Checkbox>Tailor Shop</Checkbox>
              </Menu.Item>
              <Menu.Item key="33">
                <Checkbox>Toys & Games</Checkbox>
              </Menu.Item>
              <Menu.Item key="34">
                <Checkbox>Stamp Shop</Checkbox>
              </Menu.Item>
              <Menu.Item key="35">
                <Checkbox>Food & Drinks</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-18"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Sports Centre
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Cricket</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Basketball</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Football</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Hockey</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Volleyball</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-19"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Tourist Places
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>Beach</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Waterfall</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Statue</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Geographic Feature</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Museum</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4-20"
              title={
                <span>
                  <Checkbox className="mr-2" />
                  Utility
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox>EV Stations</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Petrol Stations</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Electric Stations</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Gas Stations</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Telephone Station</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Water Supply</Checkbox>
              </Menu.Item>
              <Menu.Item key="7">
                <Checkbox>Overhead Tank</Checkbox>
              </Menu.Item>
              <Menu.Item key="8">
                <Checkbox>Other</Checkbox>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="sub4-21">
              <Checkbox>Zoo</Checkbox>
            </Menu.Item>
            <Menu.Item key="sub4-22">
              <Checkbox>Shopping Centre</Checkbox>
            </Menu.Item>
          </SubMenu>

          <div className="m-4 text-center">
            <Button
              type="primary"
              className="bg-blue-700 mr-4"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="primary"
              className="bg-blue-700"
              onClick={handleDownloadMarkersInsidePolygon}
              // onClick={() => {
              //   handleDownloadMarkersInsidePolygon();
              //   showSubscriptionModal();
              // }}
            >
              {subscriptionState.paymentSuccess ? "Download" : "Subscribe"}
            </Button>
            {/* Conditionally render the "Download Boundary" button based on the user's login status */}
            {loggedIn && (
              <div className="text-center mt-2">
                <Button
                  type="primary"
                  className="bg-blue-700"
                  onClick={handleDownloadBoundary}
                >
                  Download Boundary
                </Button>
              </div>
            )}
          </div>
        </Menu>
      </Sider>

      {/* Subscription Modal  */}
      <Modal
        open={isSubscriptionModalOpen}
        onCancel={handleCancel}
        style={{ margin: 10, padding: 0 }}
        centered
        width={"85%"}
        footer={null}
      >
        <Subscription />
      </Modal>
    </>
  );
}

export default SideBar;
