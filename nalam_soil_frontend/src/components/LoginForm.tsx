import React from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useAuth } from "../lib/auth-context";
import { useNavigate, Link } from "react-router-dom";
import { PhoneOutlined, LockOutlined } from "@ant-design/icons";

const { Text } = Typography;

function LoginForm() {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        message.error(result.error || "Invalid credentials");
        setIsLoading(false);
        return;
      }

      login(result.data);
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <h1>Nalam Soil</h1>
          <p>Smart Soil Analysis for Better Harvests</p>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical" className="auth-form">
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter your mobile number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="10-digit mobile number"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-note" style={{ textAlign: "center", marginTop: "16px" }}>
          <Text>
            Don't have an account? {" "}
            <Link to="/register">Register here</Link>
          </Text>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
