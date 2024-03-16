import { useEffect, useState, useContext, lazy } from "react";
import { LoginContext } from "../context/LoginContext";
import JSZip from "jszip";
import { SubscribeContext } from "../context/SubscribeContext";
import {
  Layout,
  Menu,
  Select,
  Form,
  Checkbox,
  Modal,
  Switch,
  Button,
} from "antd";
import SelectAllCheckbox from "./SelectAllCheckBox";
import axios from "axios";

const Subscription = lazy(() => import("./Subscription"));
const TableData = lazy(() => import("./TableData"));

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
  onPoiTypesChange,
  selectedRoadTypes,
  onBuildingTypeChange,
  homeSelected,
}) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isMapLayerVisible, setIsMapLayerVisible] = useState(true);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  /* ---------- Login ------------ */
  const { loggedIn, userData, storedToken } = useContext(LoginContext);

  /*----------- Select All checkbox ----------*/

  /* --------------- Airport ------------- */

  const [airportData, setAirportData] = useState([]);
  const [checkAirports, setCheckAirports] = useState(false);
  const [checkAllAirport, setCheckAllAirport] = useState(false);
  const [homesSelected, setHomesSelected] = useState(false);

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
    selectedRoadTypes(val);
    // onRoadTypeChange(val);
  };
  const onCheckAllRoad = (e) => {
    setRoadData(e.target.checked ? roadTypes : []);
    setCheckRoads(false);
    setCheckAllRoad(e.target.checked);
    selectedRoadTypes(e.target.checked ? roadTypes : []);
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
    onBuildingTypeChange(val);
  };
  const onCheckAllBuilding = (e) => {
    setBuildingData(e.target.checked ? buildingTypes : []);
    setCheckBuildings(false);
    setCheckAllBuilding(e.target.checked);
    onBuildingTypeChange(e.target.checked ? buildingTypes : []);
  };

  /* -------------------- POIs --------------------- */

  const [checkedListPOI, setCheckedListPOI] = useState({});
  const [indeterminatePOI, setIndeterminatePOI] = useState({});
  const [checkAllPOI, setCheckAllPOI] = useState({});

  const onChangePOI = (category, checkedValues) => {
    const newCheckedList = { ...checkedListPOI, [category]: checkedValues };
    setCheckedListPOI(newCheckedList);
    setIndeterminatePOI({
      ...indeterminatePOI,
      [category]:
        !!checkedValues.length && checkedValues.length < POI[category].length,
    });
    setCheckAllPOI({
      ...checkAllPOI,
      [category]: checkedValues.length === POI[category].length,
    });
    onPoiTypesChange([newCheckedList]);
  };

  const onCheckAllChangePOI = (category, e) => {
    const allChecked = e.target.checked;
    const newCheckedListPOI = {
      ...checkedListPOI,
      [category]: allChecked ? POI[category] : [],
    };
    setCheckedListPOI(newCheckedListPOI);
    setIndeterminatePOI({ ...indeterminatePOI, [category]: false });
    setCheckAllPOI({ ...checkAllPOI, [category]: allChecked });
    onPoiTypesChange([newCheckedListPOI]);
  };
  const POI = {
    "Automotive Dealer": [
      "Bike",
      "Car",
      "Bus",
      "Truck",
      "Electric Vehicle",
      "Others",
    ],
    Companies: ["Private Companies", "Others"],
    Entertainment: [
      "Café/Pub",
      "Cinema Hall",
      "Theatre",
      "Nightlife",
      "Bar",
      "Others",
    ],
    "Golf Course": [],
    "Hotels/Restaurants": ["Hotels", "Restaurants", "Others"],
    "Place of Worship": [
      "Temple",
      "Church",
      "Masjid",
      "Gurudwara",
      "Ashram",
      "Mosque",
      "Pagoda",
      "Community Centre",
    ],
    "Repair Facility": ["Bike", "Cycle", "Car", "Others"],
    "Business Park": [],
    Education: [
      "School",
      "College/ University",
      "Anganwadi Centre",
      "Institutes",
      "Library",
      "Other",
    ],
    Finance: ["ATM", "Bank", "Loan/Others"],
    "Government Office": [
      "Central Government",
      "State Government",
      "City level Government",
      "Court House",
      "Police Station",
      "Post office",
      "Others",
    ],
    "Health Care": [
      "Government Hospitals",
      "Private Hospitals",
      "Clinic",
      "Others",
    ],
    Hostels: ["Boys Hostel", "Girls Hostel", "Other"],
    "Park and Recreation Area": ["Cemetery", "Park", "Picnic Spot", "Memorial"],
    "Public Amenity": ["Toilet", "Bus stop", "Aadhar Centre/CSC", "Rest Area"],
    Services: [
      "Professional Services",
      "Communication Services",
      "Other Services",
    ],
    Shop: [
      "Pharmacy",
      "Variety Store",
      "Travel Agents",
      "Agricultural Supplies",
      "Cycle Store",
      "Animal Services",
      "Antique/Art",
      "Bags & Leatherwear",
      "Beauty Salon",
      "Gents Salon",
      "Footwear & Shoe Repairs",
      "Cloth Store",
      "Books Shops",
      "Delicatessen",
      "Dry cleaners",
      "Electricals",
      "Electronics",
      "Factory Outlet",
      "Florists & Puja Vandar",
      "Furniture/Home Furnishings",
      "                Glassware/Ceramic",
      "Hardware",
      "House & Garden",
      "Jewelry",
      "Clocks & Watches",
      "                Mobile Phone",
      "             Opticians",
      "Photo Lab/Development",
      "              Photocopy",
      "Sports Equipment & Clothing",
      "                Recycling Shop",
      "                Tailor Shop",
      "Toys & Games",
      "                Stamp Shop",
      "Food & Drinks",
    ],
    "Sports Centre": [
      "Cricket",
      "Basketball",
      "Football",
      "Hockey",
      "Volleyball",
      "Others",
    ],
    "Tourist Places": [
      "                Beach",
      "                Waterfall",
      "                Statue",
      "Geographic Feature",
      "                Museum",
      "                Others",
    ],
    Utility: [
      "EV Stations",
      "Petrol Stations",
      "Electric Stations",
      "Gas Stations",
      "Telephone Station",
      "Water Supply",
      "Overhead Tank",
      "                Other",
    ],
    Zoo: [],
    "Shopping Centre": [],
    Undefined: [],
  };

  /* ----------------------------------------------- */

  /* ----- Countries ----- */

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    onSelectedCountry(value.toLowerCase());
    setCheckAllPOI({});
    setIndeterminatePOI({});
    setCheckedListPOI({});
    onPoiTypesChange([]);
    onSelectedCity("");
    setSelectedCity("");
    setSelectedDistrict("");
    onSelectedDistrict("");
    setSelectedState("");
    onSelectedState("");
  };

  /* ----- States ----- */
  const handleStateChange = (value) => {
    setSelectedState(value);
    onSelectedState(value.toLowerCase());
    setCheckAllPOI({});
    setIndeterminatePOI({});
    setCheckedListPOI({});
    onPoiTypesChange([]);
    onSelectedCity("");
    setSelectedCity("");
    setSelectedDistrict("");
    onSelectedDistrict("");
  };

  /* ----- Districts ----- */

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    onSelectedDistrict(value.toLowerCase());
    setCheckAllPOI({});
    setIndeterminatePOI({});
    onPoiTypesChange([]);
    setCheckedListPOI({});
    onSelectedCity("");
    setSelectedCity("");
  };

  /* ----- Cities ----- */

  const handleCityChange = (value) => {
    onSelectedCity(value);
    setSelectedCity(value.toLowerCase());
    setCheckAllPOI({});
    setIndeterminatePOI({});
    setCheckedListPOI({});
    onPoiTypesChange([]);
  };

  /* ---------------------------------- */

  /* ------ Get Data Limit ----- */
  const [limitData, setLimitData] = useState([]);

  const getLimitData = async () => {
    try {
      const headers = {
        Token: storedToken,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        "http://54.252.180.142:8080/api/user/getlimit",
        {
          headers: headers,
        }
      );
      setLimitData(response.data);
    } catch (error) {
      console.error("Error fetching limit data:", error);
    }
  };
  /* ------ Download The Data -------- */

  const handleDownload = () => {
    if (userData?.tier === "free") {
      setIsSubscriptionModalOpen(true);
    } else {
      setIsCategoryModalOpen(true);
      getLimitData();
    }
  };
  console.log(userData);
  /* ---- After Success Of Subscription ------ */

  const handleOnSuccess = () => {
    setIsSubscriptionModalOpen(false);
  };

  useEffect(() => {
    handleOnSuccess();
  }, []);

  const handleCancelCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  /* ----------Polygon Create----------- */

  const handleDownloadMarkersInsidePolygon = () => {
    if (userData.tier !== "free") {
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

  /* -------------- For Reset ------------ */
  const handleReset = () => {
    setSelectedCountry("");
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCity("");
    setAirportData([]);
    setCheckAirports(false);
    setCheckAllAirport(false);
    setRailData([]);
    setCheckRails(false);
    setCheckAllRail(false);
    setRoadData([]);
    setCheckRoads(false);
    setCheckAllRoad(false);
    setBuildingData([]);
    setCheckBuildings(false);
    setCheckAllBuilding(false);
    setHomesSelected(false);
    setCheckedListPOI({});
    setIndeterminatePOI({});
    setCheckAllPOI({});
    onSelectedCountry("");
    onSelectedState("");
    onSelectedDistrict("");
    onPoiTypesChange("");
    onRailTypeChange("");
    selectedRoadTypes("");
    onBuildingTypeChange("");
    homeSelected("");
  };

  /* ------------Map Switch Layer ------------ */
  const handleMapLayerToggle = () => {
    const newVisibility = !isMapLayerVisible;
    setIsMapLayerVisible(newVisibility);

    if (onToggleMapLayerVisibility) {
      onToggleMapLayerVisibility(newVisibility);
    }
  };

  const handleCancel = () => {
    setIsSubscriptionModalOpen(false);
  };

  // useEffect(() => {
  //   // Function to prevent right-click on the sidebar when user is not logged in
  //   const preventRightClick = (event) => {
  //     if (!loggedIn) {
  //       event.preventDefault();
  //     }
  //   };

  //   // Function to prevent F12 key when user is not logged in
  //   const preventF12 = (event) => {
  //     if (!loggedIn && event.keyCode === 123) {
  //       event.preventDefault();
  //     }
  //   };

  //   document.addEventListener("contextmenu", preventRightClick);
  //   document.addEventListener("keydown", preventF12);

  //   return () => {
  //     document.removeEventListener("contextmenu", preventRightClick);
  //     document.removeEventListener("keydown", preventF12);
  //   };
  // }, [loggedIn]);

  /* ------ Get All Country/State/District/City Data ------ */
  const [allData, setAllData] = useState("");

  const getZipData = async (response, file) => {
    const zip = new JSZip();
    const zipFile = await zip.loadAsync(response.data);
    const jsonData = await zipFile.file(file).async("string");
    return JSON.parse(jsonData);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get(
          "https://vumap.s3.ap-south-1.amazonaws.com/All_data.zip",
          { responseType: "arraybuffer" }
        );

        const getAllData = await getZipData(response, "data.json");

        setAllData(getAllData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAllData();
  }, []);

  /* --- Get All Countries ---- */
  const filteredCountries =
    allData?.Countries?.filter((item) => item.Country[0].country) || [];

  /* --- Get All States ---- */
  const filteredStates =
    filteredCountries.find(
      (item) => item.Country[0].country === selectedCountry
    )?.Country[0]?.States || [];

  /* --- Get All Districts ---- */
  const filteredDistricts =
    filteredStates.find((item) => item.state === selectedState)?.Districts ||
    [];

  /* --- Get All Cities ---- */
  const filteredCities =
    filteredDistricts.find((item) => item.district === selectedDistrict)
      ?.Cities || [];

  const handleCheckboxChange = (e) => {
    setHomesSelected(e.target.checked);
    homeSelected(e.target.checked);
  };

  return (
    <>
      <Sider width={300} className="side-bar">
        {/* Checkbox for toggling map tile layer visibility */}
        <div className="flex justify-center mb-[2rem]">
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
                <label className="label-sidebar-select">Country: </label>
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleCountryChange(value)}
                >
                  <option value="">Select Country</option>
                  {filteredCountries.map((item, index) => {
                    return (
                      <Select.Option
                        key={item.Country[0]?.country + index}
                        value={item.Country[0]?.country}
                      >
                        {item.Country[0]?.country}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className="label-sidebar-select">States: </label>
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleStateChange(value)}
                  disabled={selectedCountry?.length < 1}
                >
                  <Select.Option value="">Select State</Select.Option>
                  {filteredStates.map((item, index) => {
                    return (
                      <Select.Option
                        key={`${selectedState}-${index}`}
                        value={item.state}
                      >
                        {item.state}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className="label-sidebar-select">District:</label>{" "}
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleDistrictChange(value)}
                  disabled={selectedState?.length < 1}
                >
                  <option value="">Select District</option>
                  <option value="Khordha">Khordha</option>
                  {filteredDistricts.map((item, index) => {
                    return (
                      <Select.Option
                        key={`${selectedDistrict}-${index}`}
                        value={item.district}
                      >
                        {item.district}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Form.Item>
          <Form.Item>
            <div className="select-group">
              <div>
                <label className="label-sidebar-select">City:</label>{" "}
              </div>
              <div>
                <Select
                  style={{ width: 160 }}
                  onChange={(value) => handleCityChange(value)}
                  disabled={selectedDistrict?.length < 1}
                >
                  <option value="">Select City</option>
                  <option value="bhubaneswar">Bhubaneswar</option>
                  {filteredCities.map((item, index) => {
                    return (
                      <Select.Option key={`${item}-${index}`} value={item}>
                        {item}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </Form.Item>
          {selectedCountry.length > 0 && (
            <SubMenu key="sub11" title="Transports">
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
              {selectedState.length > 0 && (
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
              )}
              {selectedCity.length > 0 && (
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
              )}
            </SubMenu>
          )}
          {/* {selectedCity.length > 0 && (
            <SubMenu
              disabled
              key="building"
              title={
                <SelectAllCheckbox
                  title="Buildings"
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
          )} */}
          {selectedCity.length > 0 && (
            <SubMenu
              key="house number"
              className="no-arrow"
              title={
                <Checkbox
                  onChange={handleCheckboxChange}
                  checked={homesSelected}
                >
                  House Number
                </Checkbox>
              }
            ></SubMenu>
          )}

          {/* ---- POIs ---- */}
          {selectedCity.length > 0 && (
            <SubMenu key="POIData" title="POI">
              {Object.keys(POI).map((category) => (
                <SubMenu
                  key={category}
                  title={
                    <Checkbox
                      indeterminate={indeterminatePOI[category]}
                      onChange={(e) => onCheckAllChangePOI(category, e)}
                      checked={checkAllPOI[category]}
                    >
                      {category}
                    </Checkbox>
                  }
                >
                  <CheckboxGroup
                    options={POI[category]}
                    value={checkedListPOI[category]}
                    onChange={(checkedValues) =>
                      onChangePOI(category, checkedValues)
                    }
                  />
                </SubMenu>
              ))}
            </SubMenu>
          )}

          <div className="button-group-box">
            <Button
              className="button-item"
              type="primary"
              size="large"
              onClick={handleReset}
            >
              Reset
            </Button>
            {markersInsidePolygon.length > 0 && (
              <Button
                className="button-item"
                type="primary"
                size="large"
                onClick={handleDownload}
              >
                Download
              </Button>
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
        width={"90%"}
        footer={null}
      >
        <Subscription onSuccess={handleOnSuccess} />
      </Modal>
      {loggedIn && (
        <TableData
          dataMarker={markersInsidePolygon}
          modalOpen={isCategoryModalOpen}
          modalClose={handleCancelCategoryModal}
          downloadModal={handleDownloadMarkersInsidePolygon}
          limitData={limitData}
        />
      )}
    </>
  );
}

export default SideBar;
