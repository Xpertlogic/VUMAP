import React, { useContext, useState, useEffect } from "react";
import "../style/style.css";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import { Layout, Menu, notification, Button, Modal } from "antd";
import { LoginContext } from "../context/LoginContext";
const { Header } = Layout;

function HeaderCompo() {
  /* ------ for User Login ----- */
  const { loggedIn, login, logout, email, userData } = useContext(LoginContext);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  //------------For Page Refresh Data store In Local Storage -----

  // useEffect(() => {
  //   if (!loggedIn) {
  //     const timer = setInterval(() => {
  //       setIsSignUpModalOpen(true);
  //     }, 10000);

  //     return () => clearInterval(timer);
  //   }
  // }, [loggedIn]);

  const handleLogin = (email, authToken, enteredPassword) => {
    login(email, authToken);
    setShowWelcomeModal(true);
    setIsSignInModalOpen(false);
    setIsLoggingIn(false);
  };

  const handleLogout = () => {
    logout();
    setShowWelcomeModal(false);
    notification.success({
      message: "Logged Out",
      description: "You have been successfully logged out.",
    });
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
    setIsLoggingIn(false);
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
  // const location = useLocation();
  // const pathForBreadcrumb = location.pathname.split("/").filter((i) => i);

  return (
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
              <Link to="/About">About</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/Contact">Contact</Link>
            </Menu.Item>

            {loggedIn ? (
              <div style={{ position: "absolute", right: "5%" }}>
                <Button type="primary" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              // Render Sign In and Sign Up buttons when not logged in
              <div style={{ position: "absolute", right: "5%" }}>
                <Button type="primary" onClick={showSignInModal}>
                  Sign In
                </Button>
                <Button type="primary" onClick={showSignUpModal}>
                  Sign Up
                </Button>
              </div>
            )}
          </Menu>

          {/* Sign In Modal  */}
          <Modal
            title="Sign In"
            open={isSignInModalOpen}
            onOk={hideSignInModal}
            onCancel={hideSignInModal}
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
            >
              <p className="text-2xl">Welcome To Vumap, {userData.username}!</p>
            </Modal>
          )}

          {/* Signup Modal */}
          <Modal
            title="Sign Up"
            open={
              isSignUpModalOpen &&
              !loggedIn &&
              !isLoggingIn &&
              !isSignInModalOpen
            } // Show modal only if it's not logged in
            onCancel={hideSignUpModal}
            centered
            footer={null}
          >
            <Signup onLogin={handleLogin} />
          </Modal>
        </Header>
        {/* Dynamic breadcrumbs */}
        {/* <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            
            {pathForBreadcrumb.map((breadcrumbItem, index) => (
              <Breadcrumb.Item key={index}>
                <Link
                  to={`/${pathForBreadcrumb.slice(0, index + 1).join("/")}`}
                >
                  {breadcrumbItem}
                </Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Content> */}
      </Layout>
    </>
  );
}

export default HeaderCompo;
