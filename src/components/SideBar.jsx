import { useEffect, useState } from "react";
import { Layout, Menu, Select, Form, Checkbox } from "antd";
import countryData from "../data/indiaData.json";
import stateData from "../data/All_State_Data.json";
import districtData from "../data/districts.json";
// import HouseNumberData from "../data/HouseNum.json";
const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar({
  onSelectedCountry,
  onSelectedState,
  onSelectedDistrict,
  selectedAirportTypes,
  onAirportTypeChange,
  onSelectedHouseNum,
}) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  // const [selectedHouseNum, setSelectedHouseNum] = useState();

  /* --------------- Airport ------------- */

  const handleAirportTypeChange = (airportType) => {
    const updatedSelectedTypes = selectedAirportTypes.includes(airportType)
      ? selectedAirportTypes.filter((type) => type !== airportType)
      : [...selectedAirportTypes, airportType];

    onAirportTypeChange(updatedSelectedTypes);
  };

  /* ------------------------------------- */

  /* --------------- Railway ------------- */

  /* ------------------------------------- */

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

  /* ------- House Number ------ */
  // const getHousesData = HouseNumberData.features
  //   .map((item) => item.properties.IDPRIM)
  //   .filter((x) => x !== null);

  // // console.log(getHousesData);

  // const handelHouseNumber = (value) => {
  //   const getHouseNum = HouseNumberData?.features.find(
  //     (item) => item.properties.IDPRIM === value
  //   );

  //   setSelectedHouseNum(getHouseNum);
  //   onSelectedHouseNum(value);
  // };

  /* -------------------------------- */

  useEffect(() => {
    // If the country changes, reset state and district
    setSelectedState(null);
    setSelectedDistrict(null);
  }, [selectedCountry]);

  useEffect(() => {
    // If the state changes, reset district
    setSelectedDistrict(null);
  }, [selectedState]);

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
              <span className="text-[1rem]">Administrative Boundaries</span>
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
          </SubMenu>

          <SubMenu
            key="sub1"
            title={<span className="text-[1rem]">Transports</span>}
          >
            <SubMenu key="sub1-1" title="Airports">
              <Menu.Item key="1">
                <Checkbox
                  onChange={() => handleAirportTypeChange("International")}
                  checked={selectedAirportTypes.includes("International")}
                >
                  Internationals Airports
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox
                  onChange={() => handleAirportTypeChange("Domestic")}
                  checked={selectedAirportTypes.includes("Domestic")}
                >
                  Domestic Airports
                </Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox
                  onChange={() => handleAirportTypeChange("State/Private")}
                  checked={selectedAirportTypes.includes("State/Private")}
                >
                  State/Other Airports
                </Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub1-2" title="Rail">
              <Menu.Item key="3">
                <Checkbox>Rail Line</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Platforms</Checkbox>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub1-3" title="Roads">
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
            title={<span className="text-[1rem]">Buildings</span>}
          >
            <Menu.Item key="5">
              <Checkbox>Residentials</Checkbox>
            </Menu.Item>
            <Menu.Item key="6">
              <Checkbox>Commercial</Checkbox>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="sub3">
            <Checkbox className="text-[1rem]">House Number</Checkbox>
          </Menu.Item>
          <SubMenu key="sub4" title={<span className="text-[1rem]">POI</span>}>
            <SubMenu key="sub4-1" title="Automotive Dealer">
              <Menu.Item key="1">
                <Checkbox>Bike</Checkbox>
              </Menu.Item>
              <Menu.Item key="2">
                <Checkbox>Car</Checkbox>
              </Menu.Item>
              <Menu.Item key="3">
                <Checkbox>Bus</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Truck</Checkbox>
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
        </Menu>
      </Sider>
    </>
  );
}

export default SideBar;
