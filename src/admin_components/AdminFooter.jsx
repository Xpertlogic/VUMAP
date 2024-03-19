import { Layout } from "antd";

const { Footer } = Layout;

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

const AdminFooter = () => {
  return (
    <Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
};

export default AdminFooter;
