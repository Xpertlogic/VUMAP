import { Layout } from "antd";

const { Header } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
};

const AdminHeader = () => {
  return (
    <Layout>
      <Header style={headerStyle}>Header</Header>
    </Layout>
  );
};

export default AdminHeader;
