import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import { Layout, Menu, Button, Modal, Grid, Drawer, Breadcrumb } from "antd";
import { LoginContext } from "../context/LoginContext";
import { MenuOutlined } from "@ant-design/icons";
import Profile from "./Profile";
const { useBreakpoint } = Grid;
const { Content } = Layout;

function HeaderCompo() {
  /* ------ for User Login ----- */
  const { loggedIn, login, userData } = useContext(LoginContext);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  //------------For Page Refresh Data store In Local Storage -----

  // useEffect(() => {
  //   if (!loggedIn) {
  //     const timer = setInterval(() => {
  //       setIsSignUpModalOpen(true);
  //     }, 10000);

  //     return () => clearInterval(timer);
  //   }
  // }, [loggedIn]);

  const handleLogin = (email, authToken) => {
    login(email, authToken);
    setShowWelcomeModal(true);
    setIsSignInModalOpen(false);
  };

  const hideWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  const showSignInModal = () => {
    setIsSignInModalOpen(true);
    setIsSignUpModalOpen(false);
  };

  const hideSignInModal = () => {
    setIsSignInModalOpen(false);
  };

  const showSignUpModal = () => {
    if (!isSignInModalOpen) {
      setIsSignUpModalOpen(true);
    }
  };

  const hideSignUpModal = () => {
    setIsSignUpModalOpen(false);
  };

  /* ---- Path For Breadcrumb Item ---- */
  const location = useLocation();
  const screens = useBreakpoint();
  const pathForBreadcrumb = location.pathname.split("/").filter((i) => i);

  const menuItems = (
    <Menu
      className="nav-bar"
      theme={screens.md ? "dark" : "light"}
      mode={screens.md ? "horizontal" : "vertical"}
      defaultSelectedKeys={[location.pathname]}
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/about">
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="/contact">
        <Link to="/contact">Contact</Link>
      </Menu.Item>
      <Menu.Item key="/terms&condition">
        <Link to="/terms&condition">T&C</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Layout className="nav-layout">
        {screens.md ? (
          <nav className="nav container">
            {menuItems}
            <div>
              {loggedIn ? (
                <div className="header-btn-group">
                  <Profile />
                </div>
              ) : (
                <div className="header-btn-group">
                  <Button
                    className="button-item"
                    type="primary"
                    size="large"
                    onClick={showSignInModal}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="button-item"
                    type="primary"
                    size="large"
                    onClick={showSignUpModal}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <nav className="nav container">
            <Button
              className="humburgger"
              type="text"
              onClick={() => setDrawerVisible(true)}
              icon={<MenuOutlined className="menu-icon" />}
            />
            <Drawer
              title="Menu"
              placement="left"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
            >
              {menuItems}
            </Drawer>
            <div>
              {loggedIn ? (
                <div className="header-btn-group">
                  <Profile />
                </div>
              ) : (
                <div className="header-btn-group">
                  <Button
                    className="button-item"
                    type="primary"
                    size={screens.md ? "large" : "middle"}
                    onClick={showSignInModal}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="button-item"
                    type="primary"
                    size={screens.md ? "large" : "middle"}
                    onClick={showSignUpModal}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </nav>
        )}
      </Layout>
      {/* Dynamic breadcrumbs */}
      <Layout>
        <Content className="container pl-5 ">
          <Breadcrumb style={{ margin: "16px 0" }} className="text-2xl">
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>

            {pathForBreadcrumb.map((breadcrumbItem, index) => (
              <Breadcrumb.Item key={index}>
                <Link to={`/${breadcrumbItem.toLowerCase()}`}>
                  {breadcrumbItem.charAt(0).toUpperCase() +
                    breadcrumbItem.slice(1).toLowerCase()}
                </Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Content>
      </Layout>
      {/* Sign In Modal  */}
      <Modal
        title="Sign In"
        open={isSignInModalOpen}
        onOk={hideSignInModal}
        onCancel={hideSignInModal}
        centered
        footer={null}
      >
        <Signin onLogin={handleLogin} />
      </Modal>

      {loggedIn && (
        <Modal
          title="Welcome"
          open={showWelcomeModal}
          onOk={hideWelcomeModal}
          onCancel={hideWelcomeModal}
          centered
          width={"50%"}
          okButtonProps={{
            style: {
              backgroundColor: "#007bff",
            },
          }}
        >
          <p className="text-[3rem]">
            Welcome To GISMap Layers, {userData.username}!
          </p>
        </Modal>
      )}

      {/* Signup Modal */}
      <Modal
        title="Sign Up"
        open={isSignUpModalOpen && !loggedIn} // Show modal only if it's not logged in
        onCancel={hideSignUpModal}
        centered
        footer={null}
      >
        <Signup onLogin={handleLogin} />
      </Modal>
    </>
  );
}

export default HeaderCompo;
