import React, { useState } from "react";
import "./style/style.css";
import { Layout, Menu, Breadcrumb, Select, Form, Checkbox } from "antd";
import OpenMap from "./components/OpenMap";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
function App() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">About</Menu.Item>
          <Menu.Item key="3">Contact</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Map</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ background: "#fff" }}>
          <Sider width={300} style={{ padding: "16px 0", background: "#fff" }}>
            <Menu
              mode="inline"
              // defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
            >
              <Form.Item label="States">
                <Select
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: "odisha", label: "Odisha" }]}
                />
              </Form.Item>
              <Form.Item label="District">
                <Select
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: "khorda", label: "Khorda" }]}
                />
              </Form.Item>
              <Form.Item label="City">
                <Select
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
                />
              </Form.Item>
              <Form.Item label="Postal">
                <Select
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
                />
              </Form.Item>
              <Form.Item label="Locality">
                <Select
                  style={{ width: 150 }}
                  onChange={handleChange}
                  options={[{ value: "bhubaneswar", label: "Bhubaneswar" }]}
                />
              </Form.Item>
              <SubMenu key="sub1" title={<span>Transports</span>}>
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
              <SubMenu key="sub2" title={<span>Buildings</span>}>
                <Menu.Item key="5">
                  <Checkbox>Residentials</Checkbox>
                </Menu.Item>
                <Menu.Item key="6">
                  <Checkbox>Commercial</Checkbox>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="sub3">
                <Checkbox>House Number</Checkbox>
              </Menu.Item>
              <SubMenu key="sub4" title={<span>POI</span>}>
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
                <SubMenu
                  key="sub4-14"
                  title="Park and Recreation Area"
                ></SubMenu>
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
          {/* <Content style={{ padding: "0 24px", minHeight: 280 }}>
            Content
          </Content> */}
          <Content className="">
            <OpenMap />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2023 Vumtech</Footer>
    </Layout>
  );
}

export default App;
