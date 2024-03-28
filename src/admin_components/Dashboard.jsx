import React from "react";
import AddData from "./AddData";

import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;

const Dashboard = () => {
  const labels = ["My Dashboard", "News & Updates"];

  const items = labels.map((label, index) => ({
    key: String(index + 1),
    label: label,
  }));

  return (
    <section className="container admin-section">
      <h1>Admin Dashboard</h1>
      <Layout className=" dashboard">
        <Sider className="admin-sidebar">
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
            className="text-3xl"
          >
            {items.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Content>
          <div className="main-data">
            <AddData />
          </div>
        </Content>
      </Layout>
      <p>&copy; VUMTECH DESIGN AND GEOSPATIAL PRIVATE LIMITED 2024</p>
    </section>
  );
};

export default Dashboard;
