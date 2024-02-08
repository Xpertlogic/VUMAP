import { useState } from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { notification, Button, Checkbox, Form, Input } from "antd";
import axios from "axios";

const Signin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
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
        console.log(response.data);

        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
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
        remember: true,
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
        <Input
          prefix={<LockOutlined />}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="block" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-700 mr-[5px]"
        >
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};
export default Signin;
