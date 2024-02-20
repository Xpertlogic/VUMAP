import { useEffect, useState, useCallback, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
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
import useRazorpay from "react-razorpay";
import countryData from "../data/indiaData.json";
import stateData from "../data/All_State_Data.json";
import districtData from "../data/districts.json";
import Subscription from "./Subscription";
const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar({
  onLogin,
  loggedIn,
  markersInsidePolygon,
  setMarkersInsidePolygon,
  onToggleMapLayerVisibility,
  onSelectedCountry,
  onSelectedState,
  onSelectedDistrict,
  selectedAirportTypes,
  onAirportTypeChange,
  selectedPoiTypes,
  onPoiTypesChange,
}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(true);

  /* ---------- Login ------------ */

  const loginState = useContext(LoginContext);
  console.log("login", loginState);

  /* ------- Payment ----------- */

  // const handlePayment = async () => {
  //   const options = {
  //     key: "rzp_test_idc2jcfNoLW3KG",
  //     amount: "30000",
  //     currency: "INR",
  //     name: "Acme Corp",
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     handler: (res) => {
  //       console.log(res); //Api hit post method -> payment id
  //     },
  //     prefill: {
  //       name: "Piyush Garg",
  //       email: "youremail@example.com",
  //       contact: "9999999999",
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzpay = new Razorpay(options);
  //   rzpay.open();
  // };

  // let amount;
  // if (plan === "premium") {
  //   amount = "29900";
  // } else if (plan === "premiumPlus") {
  //   amount = "99900";
  // }

  /* ---------------------------------- */

  /* ---------- Download Boundary -------- */
  const handleDownloadBoundary = () => {
    // Replace the below URL with your Google Drive link
    const googleDriveLink =
      "https://drive.google.com/drive/folders/1pliyxUo_Pj7OrYk0gv7tB5j6Vv9l26zB?usp=drive_link";
    window.location.href = googleDriveLink;
  };

  //----------Polygon Create-----------

  const handleDownloadMarkersInsidePolygon = () => {
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
  };

  //-------------------

  /*----------- Select All checkbox ----------*/
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    sub5: [],
    sub1: [],
    sub2: [],
    sub3: [],
    sub4: [],
    sub11: [],
    airports: [],
  });
  /* ------------------------------------------ */

  //-------------- For Reset ------------
  const handleReset = () => {
    setSelectedCheckboxes({
      sub5: [],
      sub1: [],
      sub2: [],
      sub3: [],
      sub4: [],
      sub11: [],
      airports: [],
    });
    setSelectedCountry(undefined);
    setSelectedState(undefined);
    setSelectedDistrict(undefined);
  };

  /* ------------Map Switch Layer ------------ */
  const handleMapLayerToggle = () => {
    const newVisibility = !isMapLayerVisible;
    setIsMapLayerVisible(newVisibility);

    if (onToggleMapLayerVisibility) {
      onToggleMapLayerVisibility(newVisibility);
    }
  };

  // --------------------------------

  //-----------------------------------

  // Function to handle individual checkbox changes within each submenu
  const handleCheckboxChange = (submenuKey, checkboxKey) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const submenuCheckboxes = prevSelectedCheckboxes[submenuKey];
      const updatedCheckboxes = submenuCheckboxes.includes(checkboxKey)
        ? submenuCheckboxes.filter((key) => key !== checkboxKey)
        : [...submenuCheckboxes, checkboxKey];
      return { ...prevSelectedCheckboxes, [submenuKey]: updatedCheckboxes };
    });
  };

  // Function to handle "Select All" checkbox changes within each submenu
  const handleSelectAll = (submenuKey, submenuItems) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const isAllSelected =
        prevSelectedCheckboxes[submenuKey].length === submenuItems.length;
      const updatedCheckboxes = isAllSelected
        ? []
        : [...submenuItems.map((item) => item.toString())];
      return { ...prevSelectedCheckboxes, [submenuKey]: updatedCheckboxes };
    });
  };

  /* ------------------------------------------------ */

  /* --------------- Airport ------------- */

  // const handleAirportTypeChange = (airportType) => {
  //   const updatedSelectedTypes = selectedAirportTypes.includes(airportType)
  //     ? selectedAirportTypes.filter((type) => type !== airportType)
  //     : [...selectedAirportTypes, airportType];

  //   onAirportTypeChange(updatedSelectedTypes);
  // };

  // Function to handle airport type change
  const handleAirportTypeChange = (airportType) => {
    const updatedSelectedTypes = selectedAirportTypes.includes(airportType)
      ? selectedAirportTypes.filter((type) => type !== airportType)
      : [...selectedAirportTypes, airportType];

    onAirportTypeChange(updatedSelectedTypes);
  };

  /* --------------- POI ------------- */
  const handelPoiTypeChange = (poiType) => {
    const updatedSelectedPoiTypes = selectedPoiTypes.includes(poiType)
      ? selectedPoiTypes.filter((type) => type !== poiType)
      : [...selectedPoiTypes, poiType];

    onPoiTypesChange(updatedSelectedPoiTypes);
  };

  /* ---------------- */

  /* ---- Country ---- */

  const getCountryData = countryData.features
    .map((item) => item.properties.NAME)
    .filter((x) => x !== null);

  const handleCountryChange = (value) => {
    const getCountry = countryData?.features.find(
      (item) => item.properties.NAME === value
    );
    setSelectedCountry(getCountry);
    setSelectedState(null);
    setSelectedDistrict(null);
    onSelectedCountry(value);
  };

  /* --------------------- */

  /* ---- States ---- */

  const getStatesData = stateData.features
    .map((item) => item.properties.Name)
    .filter((x) => x !== null);

  const handleStateChange = (value) => {
    const getState = stateData?.features.find(
      (item) => item.properties.Name === value
    );

    setSelectedState(getState);
    setSelectedDistrict(null);
    onSelectedState(value);
  };
  /* --------------------- */

  /* ---- Districts ---- */

  const getDistrictsData = districtData.features
    .map((item) => item.properties.Dist_Name)
    .filter((x) => x !== null);

  const handleDistrictChange = (value) => {
    const getDistrict = districtData?.features.find(
      (item) => item.properties.Dist_Name === value
    );
    setSelectedDistrict(getDistrict);

    onSelectedDistrict(value);
  };
  /* --------------------- */

  useEffect(() => {
    // If the country changes, reset state and district
    setSelectedState(null);
    setSelectedDistrict(null);
  }, [selectedCountry]);

  useEffect(() => {
    // If the state changes, reset district
    setSelectedDistrict(null);
  }, [selectedState]);

  /* -------- For Subscription ------- */
  const showSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleCancel = () => {
    setIsSubscriptionModalOpen(false);
  };

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
                  style={{ width: 150 }}
                  onChange={(value) => handleCountryChange(value)}
                >
                  {getCountryData && getCountryData !== undefined
                    ? getCountryData.map((countryItem, index) => {
                        return (
                          <option value={countryItem} key={index}>
                            {countryItem}
                          </option>
                        );
                      })
                    : "No Country"}
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
                  style={{ width: 150 }}
                  onChange={(value) => handleStateChange(value)}
                  disabled={!selectedCountry}
                >
                  {getStatesData && getStatesData !== undefined
                    ? getStatesData.map((stateItem, index) => {
                        return (
                          <option value={stateItem} key={index}>
                            {stateItem}
                          </option>
                        );
                      })
                    : "No State"}
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
                  style={{ width: 150 }}
                  onChange={(value) => handleDistrictChange(value)}
                  disabled={!selectedState}
                >
                  {getDistrictsData && getDistrictsData !== undefined
                    ? getDistrictsData.map((districtItem, index) => {
                        return (
                          <option value={districtItem} key={index}>
                            {districtItem}
                          </option>
                        );
                      })
                    : "No District"}
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
                  style={{ width: 150 }}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
                  disabled
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">Locality:</label>{" "}
              </div>
              <div>
                <Select
                  style={{ width: 150 }}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
                  disabled
                />
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">Sub Locality:</label>{" "}
              </div>
              <div>
                <Select
                  style={{ width: 150 }}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
                  disabled
                />
              </div>
            </div>
          </Form.Item>

          <SubMenu
            key="sub5"
            title={
              <span className="text-[1rem] flex gap-2">
                <Checkbox
                  className=""
                  onChange={() =>
                    handleSelectAll("sub5", ["1", "2", "3", "4", "5"])
                  }
                  checked={selectedCheckboxes.sub5.length === 5}
                ></Checkbox>
                Administrative Boundaries
              </span>
            }
          >
            <Menu.Item key="1">
              <Checkbox
                onChange={() => handleCheckboxChange("sub5", "1")}
                checked={selectedCheckboxes.sub5.includes("1")}
              >
                Country Boundary
              </Checkbox>
            </Menu.Item>
            <Menu.Item key="2">
              <Checkbox
                onChange={() => handleCheckboxChange("sub5", "2")}
                checked={selectedCheckboxes.sub5.includes("2")}
              >
                State Boundary
              </Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
              <Checkbox
                onChange={() => handleCheckboxChange("sub5", "3")}
                checked={selectedCheckboxes.sub5.includes("3")}
              >
                District Boundary
              </Checkbox>
            </Menu.Item>
            <Menu.Item key="4">
              <Checkbox
                onChange={() => handleCheckboxChange("sub5", "4")}
                checked={selectedCheckboxes.sub5.includes("4")}
              >
                Postal Boundary
              </Checkbox>
            </Menu.Item>
            <Menu.Item key="5">
              <Checkbox
                onChange={() => handleCheckboxChange("sub5", "5")}
                checked={selectedCheckboxes.sub5.includes("5")}
              >
                Locality Boundary
              </Checkbox>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="sub11"
            title={
              <span className="text-[1rem] flex gap-2">
                <Checkbox>Transports</Checkbox>
              </span>
            }
          >
            {/* <SubMenu
              key="sub11"
              title={
                <span className="text-[1rem]">
                  <Checkbox
                    className="mr-2"
                    onChange={() => handleSelectAll("sub11", ["1", "2", "3"])}
                    checked={selectedCheckboxes.sub11.length === 3}
                  ></Checkbox>
                  Airports
                </span>
              }
            >
              <Menu.Item key="1">
                <Checkbox
                  onChange={() => {
                    handleAirportTypeChange("International");
                   
                  }}
                  checked={selectedAirportTypes.includes("International")}
                >
                  Internationals Airports
                </Checkbox>
              </Menu.Item>
              
              <Menu.Item key="2">
                <Checkbox
                  onChange={() => {
                    handleAirportTypeChange("Domestic");
                    handleCheckboxChange("sub11", "2");
                  }}
                  checked={selectedAirportTypes.includes("Domestic")}
                >
                  Domestic Airports
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox
                  onChange={() => {
                    handleAirportTypeChange("State/Private");
                    handleCheckboxChange("sub11", "3");
                  }}
                  checked={selectedAirportTypes.includes("State/Private")}
                >
                  State/Other Airports
                </Checkbox>
              </Menu.Item>
            </SubMenu> */}
            <SubMenu
              key="airports"
              title={
                <span>
                  <Checkbox
                    onChange={() =>
                      handleSelectAll("airports", [
                        "International",
                        "Domestic",
                        "State/Private",
                      ])
                    }
                    checked={selectedCheckboxes.airports.length === 3}
                  />
                  Airports
                </span>
              }
            >
              <Menu.Item key="International">
                <Checkbox
                  onChange={() => {
                    handleCheckboxChange("airports", "International");
                    handleAirportTypeChange("International");
                  }}
                  checked={selectedCheckboxes.airports.includes(
                    "International"
                  )}
                />
                International
              </Menu.Item>
              <Menu.Item key="Domestic">
                <Checkbox
                  onChange={() => {
                    handleCheckboxChange("airports", "Domestic");
                    handleAirportTypeChange("Domestic");
                  }}
                  checked={selectedCheckboxes.airports.includes("Domestic")}
                />
                Domestic
              </Menu.Item>

              <Menu.Item key="State/Private">
                <Checkbox
                  onChange={() => {
                    handleCheckboxChange("airports", "State/Private");
                    handleAirportTypeChange("State/Private");
                  }}
                  checked={selectedCheckboxes.airports.includes(
                    "State/Private"
                  )}
                />
                Regional
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub1-2"
              title={
                <span className="text-[1rem]">
                  <Checkbox className="mr-2"></Checkbox>
                  Rail
                </span>
              }
            >
              <Menu.Item key="3">
                <Checkbox>Rail Line</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Platforms</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub1-3"
              title={
                <span className="text-[1rem]">
                  <Checkbox className="mr-2"></Checkbox>
                  Roads
                </span>
              }
            >
              <Menu.Item key="3">
                <Checkbox>Roads</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Tollgates</Checkbox>
              </Menu.Item>
              <Menu.Item key="1">
                <Checkbox>Tunnel</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Fly over</Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Roads Signs</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Parking Area</Checkbox>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span className="text-[1rem] flex gap-2">
                <Checkbox
                  onChange={() => handleSelectAll("sub2", ["1", "2"])}
                  checked={selectedCheckboxes.sub2.length === 2}
                ></Checkbox>
                Buildings
              </span>
            }
          >
            <Menu.Item key="5">
              <Checkbox
                onChange={() => handleCheckboxChange("sub2", "1")}
                checked={selectedCheckboxes.sub2.includes("1")}
              >
                Residentials
              </Checkbox>
            </Menu.Item>
            <Menu.Item key="6">
              <Checkbox
                onChange={() => handleCheckboxChange("sub2", "2")}
                checked={selectedCheckboxes.sub2.includes("2")}
              >
                Commercial
              </Checkbox>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sub3">
            <Checkbox className="text-[1rem]">House Number</Checkbox>
          </Menu.Item>
          <SubMenu
            key="sub4"
            title={
              <span className="text-[1rem] flex gap-2">
                <Checkbox></Checkbox>
                POI
              </span>
            }
          >
            <SubMenu key="sub4-1" title="Automotive Dealer">
              <Menu.Item key="1">
                <Checkbox
                  onChange={() => handelPoiTypeChange("Bike")}
                  checked={selectedPoiTypes.includes("Bike")}
                >
                  Bike
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox
                  onChange={() => handelPoiTypeChange("Car")}
                  checked={selectedPoiTypes.includes("Car")}
                >
                  Car
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox
                  onChange={() => handelPoiTypeChange("Bus")}
                  checked={selectedPoiTypes.includes("Bus")}
                >
                  Bus
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox
                  onChange={() => handelPoiTypeChange("Truck")}
                  checked={selectedPoiTypes.includes("Truck")}
                >
                  Truck
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="5">
                <Checkbox>Electric Vehicle</Checkbox>
              </Menu.Item>
              <Menu.Item key="6">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4-2" title="Companies">
              <Menu.Item key="1">
                <Checkbox>Private Companies</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Others</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4-3" title="Entertainment">
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
            <SubMenu key="sub4-5" title="Hotels/Restaurants">
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
            <SubMenu key="sub4-6" title="Place of Worship">
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
            <SubMenu key="sub4-7" title="Repair Facility">
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
            <SubMenu key="sub4-9" title="Education">
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
            <SubMenu key="sub4-10" title="Finance">
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
            <SubMenu key="sub4-11" title="Government Office">
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
            <SubMenu key="sub4-12" title="Health Care">
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
            <SubMenu key="sub4-13" title="Hostels">
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
            <SubMenu key="sub4-14" title="Park and Recreation Area">
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
            <SubMenu key="sub4-15" title="Public Amenity">
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
            <SubMenu key="sub4-16" title="Services">
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
            <SubMenu key="sub4-17" title="Shop">
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
            <SubMenu key="sub4-18" title="Sports Centre">
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
            <SubMenu key="sub4-19" title="Tourist Places">
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
            <SubMenu key="sub4-20" title="Utility">
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
          <div className="m-4">
            <Button
              type="primary"
              className="bg-blue-700 mr-[1rem]"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="primary"
              className="bg-blue-700 mr-[1rem]"
              // onClick={handleDownloadMarkersInsidePolygon}
              onClick={() => {
                handleDownloadMarkersInsidePolygon();
                showSubscriptionModal();
              }}
            >
              Download
            </Button>
            {/* <Button
              onClick={handlePayment}
              type="primary"
              className="bg-blue-700"
            >
              Pay
            </Button> */}
            {/* Conditionally render the "Download Boundary" button based on the user's login status */}
            {loginState.loggedIn && (
              <div className="m-[2rem]">
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
