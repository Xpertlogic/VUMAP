import { useState } from "react";
import "../style/style.css";
import { Link, useLocation } from "react-router-dom";
import Signup from "./Signup";
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

  const handleLogin = (email, authToken, enteredPassword) => {
    setEmail(email);
    setToken(authToken);
    setPassword(enteredPassword);
    setLoggedIn(true);
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
            open={isSignInModalOpen}
            onOk={hideSignInModal}
            onCancel={hideSignInModal}
            footer={null}
          >
            <div>
              {loggedIn ? <UserLogin /> : <Signin onLogin={handleLogin} />}
            </div>
            {/* <Signin onLogin={handleLogin}/> */}
          </Modal>

          {/* Sign Up Modal  */}
          <Modal
            title="Sign Up"
            open={isSignUpModalOpen}
            onOk={hideSignUpModal}
            onCancel={hideSignUpModal}
            footer={null}
          >
            <Signup />
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
