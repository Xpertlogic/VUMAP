import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const staticUserData = [{ username: "admin", password: "password" }];

  const onFinish = (values) => {
    const { username, password } = values;
    const user = staticUserData.find(
      (e) => e.username === username && e.password === password
    );
    if (user) {
      onLogin();
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container">
      <Form
        name="admin_login"
        layout="vertical"
        onFinish={onFinish}
        className="admin-form"
      >
        <Form.Item
          label="Admin"
          name="username"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <a href="/forgot-password">Forgot password?</a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="button-item"
            size="large"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
