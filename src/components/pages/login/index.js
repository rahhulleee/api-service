// src/components/Login.js
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../hooks/auth_hooks";
import "./index.css";

const Login = () => {
  const { loginUser, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const onFinish = async () => {
    const response = await loginUser(email, password);

    if (response && response.message === "Login successful!") {
      navigate("/landing"); // Redirect to landing page on successful login
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <Form name="login" className="auth-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="auth-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      {error && <p>{error}</p>}
      <p>
        Proceed to <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
