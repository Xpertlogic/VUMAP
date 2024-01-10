import React, { useState } from "react";
import "./style/style.css";
import { Layout, Menu, Breadcrumb, Select, Form, Checkbox } from 'antd';
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
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">About</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Map</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <Form.Item label="States">
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 'orissa', label: 'Odissa' },
                ]}
              />
            </Form.Item>
            <Form.Item label="City">
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 'bhubaneswar', label: 'Bhubaneswar' },
                ]}
              />
            </Form.Item>
            <Form.Item label="Postal">
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 'bhubaneswar', label: 'Bhubaneswar' },
                ]}
              />
            </Form.Item>
            <Form.Item label="Locality">
              <Select
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                  { value: 'bhubaneswar', label: 'Bhubaneswar' },
                ]}
              />
            </Form.Item>
            <SubMenu key="sub1" title={<span>Transports</span>}>
              <SubMenu key="sub1-1" title="Airports">
                <Menu.Item key="3"><Checkbox>Internationals Airports</Checkbox></Menu.Item>
                <Menu.Item key="4"><Checkbox>Major Airports</Checkbox></Menu.Item>
                <Menu.Item key="1"><Checkbox>State/Other Airports</Checkbox></Menu.Item>
              </SubMenu>
              <SubMenu key="sub1-2" title="Rail">
                <Menu.Item key="3"><Checkbox>Rail Line</Checkbox></Menu.Item>
                <Menu.Item key="4"><Checkbox>Platforms</Checkbox></Menu.Item>
              </SubMenu>
              <SubMenu key="sub1-3" title="Roads">
                <Menu.Item key="3"><Checkbox>Roads</Checkbox></Menu.Item>
                <Menu.Item key="4"><Checkbox>Tollgates</Checkbox></Menu.Item>
                <Menu.Item key="1"><Checkbox>Tunnel</Checkbox></Menu.Item>
                <Menu.Item key="2"><Checkbox>Fly over</Checkbox></Menu.Item>
                <Menu.Item key="5"><Checkbox>Roads Signs</Checkbox></Menu.Item>
                <Menu.Item key="6"><Checkbox>Parking Area</Checkbox></Menu.Item>

              </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" title={<span>Buildings</span>}>
              <Menu.Item key="5"><Checkbox>Residentials</Checkbox></Menu.Item>
              <Menu.Item key="6"><Checkbox>Commercial</Checkbox></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
       ©2023 Vumtech
    </Footer>
  </Layout>
  );
}

export default App;
