import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import "../style/style.css";
import { Link, useLocation } from "react-router-dom";
import Signup from "./Signup";
import Subscription from "./Subscription";
import Signin from "./Signin";
import { Layout, Menu, Breadcrumb, Button, Modal } from "antd";
import UserLogin from "./UserLogin";
const { Header, Content } = Layout;

function HeaderCompo() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  /* ------ for User Login ----- */
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const handleLogin = (email, authToken, enteredPassword) => {
    setEmail(email);
    setToken(authToken);
    setPassword(enteredPassword);
    setLoggedIn(true);
    setShowWelcomeModal(true); // Show the welcome modal
    setIsSignInModalOpen(false); // Close the sign-in modal
  };

  const hideWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

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

  /* ---- Path For Breadcrumb Item ---- */
  const location = useLocation();
  const pathForBreadcrumb = location.pathname.split("/").filter((i) => i);

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
            {/* <div
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
            </div> */}
            {loggedIn ? (
              // Render user icon when logged in
              <div style={{ position: "absolute", right: "5%" }}>
                <Button type="link" icon={<UserOutlined />} />
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
            {/* {loggedIn ? (
              <Modal
                title="Welcome"
                open={showWelcomeModal}
                onOk={hideWelcomeModal}
                onCancel={hideWelcomeModal}
                centered
                width={"50%"}
              >
                <p className="text-2xl">Welcome To Vumap, {email}!</p>
              </Modal>
            ) : (
              <Signin onLogin={handleLogin} />
            )} */}
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
              <p className="text-2xl">Welcome To Vumap, {email}!</p>
            </Modal>
          )}

          {/* Sign Up Modal  */}
          <Modal
            // title="Sign Up"
            open={isSignUpModalOpen}
            onOk={hideSignUpModal}
            onCancel={hideSignUpModal}
            centered
            width={"85%"}
            footer={null}
          >
            {/* <Signup /> */}
            <Subscription />
          </Modal>
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            {/* Dynamic breadcrumbs */}
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
        </Content>
      </Layout>
    </>
  );
}

export default HeaderCompo;
