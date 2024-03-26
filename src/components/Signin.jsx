import { useEffect, useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { notification, Button, Form, Input } from "antd";
import axios from "axios";

const Signin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "https://54.252.180.142:8080/api/auth/signin",
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

      <div className="text-center mb-4">
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="button-item"
        >
          Log in
        </Button>
      </div>
    </Form>
  );
};
export default Signin;
