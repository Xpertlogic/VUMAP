import { useState } from "react";
import { Layout, Menu, Select, Form, Checkbox } from "antd";
import stateData from "../data/states.json";
const { SubMenu } = Menu;
const { Sider } = Layout;

function SideBar({ onStateChange }) {
  const [selectedState, setSelectedState] = useState(null);

  const handleChange = (value) => {
    setSelectedState(value);
    onStateChange(value);
    console.log(`selected ${value}`);
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
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          // defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <Form.Item>
            <div className="select-group">
              <div>
                <label className=" text-[1rem]">Country: </label>
              </div>
              <div>
                <Select
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: "india", label: "India" }]}
                />
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
                  onChange={handleChange}
                  options={stateData.features.map((item) => ({
                    value: item.properties.STATE,
                    label: item.properties.STATE,
                  }))}
                />
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
                  onChange={handleChange}
                  options={[{ value: "khorda", label: "Khorda" }]}
                />
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
                  onChange={handleChange}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
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
                  onChange={handleChange}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
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
                  onChange={handleChange}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
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
              <Menu.Item key="3">
                <Checkbox>Internationals Airports</Checkbox>
              </Menu.Item>
              <Menu.Item key="4">
                <Checkbox>Major Airports</Checkbox>
              </Menu.Item>
              <Menu.Item key="1">
                <Checkbox>State/Other Airports</Checkbox>
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
            <SubMenu key="sub4-1" title="Automotive Dealer"></SubMenu>
            <SubMenu key="sub4-2" title="Companies"></SubMenu>
            <SubMenu key="sub4-3" title="Entertainment"></SubMenu>
            <Menu.Item key="sub4-4">
              <Checkbox>Golf Course</Checkbox>
            </Menu.Item>
            <SubMenu key="sub4-5" title="Hotel/Restaurants"></SubMenu>
            <SubMenu key="sub4-6" title="Place of Worship"></SubMenu>
            <SubMenu key="sub4-7" title="Repair Facility"></SubMenu>
            <Menu.Item key="sub4-8">
              <Checkbox>Business Park</Checkbox>
            </Menu.Item>
            <SubMenu key="sub4-9" title="Education"></SubMenu>
            <SubMenu key="sub4-10" title="Finance"></SubMenu>
            <SubMenu key="sub4-11" title="Government Office"></SubMenu>
            <SubMenu key="sub4-12" title="Health Care"></SubMenu>
            <SubMenu key="sub4-13" title="Hostels"></SubMenu>
            <SubMenu key="sub4-14" title="Park and Recreation Area"></SubMenu>
            <SubMenu key="sub4-15" title="Public Amenity"></SubMenu>
            <SubMenu key="sub4-16" title="Services"></SubMenu>
            <SubMenu key="sub4-17" title="Shop"></SubMenu>
            <SubMenu key="sub4-18" title="Sports Centre"></SubMenu>
            <SubMenu key="sub4-19" title="Tourist Places"></SubMenu>
            <SubMenu key="sub4-20" title="Utility"></SubMenu>
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
