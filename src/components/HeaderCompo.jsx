import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "../style/style.css";
import { Layout, Menu, Breadcrumb, Button, Modal } from "antd";
import Signup from "./Signup";
import Signin from "./Signin";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
const { Header, Content } = Layout;

function HeaderCompo() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
  };

  const hideSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const showSignUpModal = () => {
    setIsSignUpModalOpen(true);
  };

  const hideSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  return (
    <Router>
      <>
        <Layout>
          <Header className="header">
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{
                lineHeight: "64px",
              }}
            >
              <Menu.Item key="1">
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/contact">Contact</Link>
              </Menu.Item>
              <div
                style={{
                  position: "absolute",
                  right: "5%",
                }}
              >
                <Button type="primary" onClick={showSignInModal}>
                  Sign In
                </Button>
                <Button type="primary" onClick={showSignUpModal}>
                  Sign Up
                </Button>
              </div>
            </Menu>

            {/* Sign In Modal  */}
            <Modal
              title="Sign In"
              visible={isSignInModalOpen}
              onOk={hideSignInModal}
              onCancel={hideSignInModal}
              footer={null}
            >
              <Signin />
            </Modal>

            {/* Sign Up Modal  */}
            <Modal
              title="Sign Up"
              visible={isSignUpModalOpen}
              onOk={hideSignUpModal}
              onCancel={hideSignUpModal}
              footer={null}
            >
              <Signup />
            </Modal>
          </Header>

          <Content style={{ padding: "0 50px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Map</Breadcrumb.Item>
            </Breadcrumb>

            <Routes>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              {/* <Route path="/" element={<Home />} /> */}
            </Routes>
          </Content>
        </Layout>
      </>
    </Router>
  );
}

export default HeaderCompo;
