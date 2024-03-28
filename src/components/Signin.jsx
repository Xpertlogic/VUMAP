import { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { notification, Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onFinish = async () => {
    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "https://gismapslayers.com/api/auth/signin",
        {
          email: email,
          password: password,
        }
      );
      if (
        response.data &&
        response.data.email === email &&
        response.data.token &&
        response.data.roles[0] === "ROLE_USER"
      ) {
        onLogin(response.data.email, response.data.token, password);
      } else if (
        response.data &&
        response.data.email === email &&
        response.data.token &&
        response.data.roles[0] === "ROLE_ADMIN"
      ) {
        localStorage.setItem("admintoken", response.data.token);
        navigate("/dashboard");
      } else {
        notification.error({
          message: "Login Failed",
          description: "Invalid response from the server.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: "An error occurred while trying to log in.",
      });
    }
  };

  return (
    <Form
      name="normal_login"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <div className="text-center">
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="button-item"
        >
          Log in
        </Button>
      </div>

      <Form.Item>
        <a href="/forgot-password" className="text-2xl">
          Forgot Password?
        </a>
      </Form.Item>
    </Form>
  );
};
export default Signin;
