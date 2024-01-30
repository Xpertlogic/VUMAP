import React, { useState } from 'react';
import axios from 'axios';
import { notification, Form, Input, Button } from 'antd';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username,
        password,
      });

      if (
        response.data &&
        response.data.username === username &&
        response.data.token &&
        response.data.roles[0] === 'ROLE_ADMIN'
      ) {
        // Store user information in sessionStorage
        //sessionStorage.setItem('username', response.data.username);
        //sessionStorage.setItem('token', response.data.token);

        onLogin(response.data.username, response.data.token, password);
        //console.log(response.data);

        notification.success({
          message: 'Login Successful',
          description: 'You have successfully logged in.',
        });
      } else {
        notification.error({
          message: 'Login Failed',
          description: 'Invalid response from the server.',
        });
      }
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: 'An error occurred while trying to log in.',
      });
    }
  };

  return (
    <>
      <div className="admin-login-component">
        <Form
          className="admin-login-form"
          name="admin-login-form"
          onFinish={handleLogin}
        >
          <h1 className="admin-login-form-heading">Admin Panel</h1>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="admin-login-form-SubmitButton"
              type="primary"
              htmlType="submit"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;

