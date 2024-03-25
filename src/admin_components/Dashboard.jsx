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
    <Layout className="container dashboard">
      <Sider>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        >
          {items.map((item) => (
            <Menu.Item key={item.key}>{item.label}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Content>
        <div
          style={{
            padding: 24,
            minHeight: 580,
          }}
        >
          <AddData />
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
