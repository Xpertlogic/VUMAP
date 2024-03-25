import { Layout } from "antd";

const { Header } = Layout;

const AdminHeader = () => {
  return (
    <Layout>
      <Header>
        <div className="logo-box">
          <p>GISMAPSLAYERS</p>
        </div>
      </Header>
    </Layout>
  );
};

export default AdminHeader;
