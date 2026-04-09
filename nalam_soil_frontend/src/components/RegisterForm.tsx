import React from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Select,
  Checkbox,
  message,
} from "antd";
import { useAuth } from "../lib/auth-context";
import { useNavigate, Link } from "react-router-dom";
import {
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { CROPS, UNITS, UNIT_LABELS } from "../lib/crop-data";

const { Text } = Typography;
const { Option } = Select;

function RegisterForm() {
  const [form] = Form.useForm();
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const cropCategories = Array.isArray(values.cropCategories)
        ? values.cropCategories
        : values.cropCategories
        ? [values.cropCategories]
        : [];

      const body = {
        ...values,
        landholding: Number(values.landholding),
        cropCategories,
      };

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        message.error(result.error || "Registration failed");
        setIsLoading(false);
        return;
      }

      authRegister(result.data);
      navigate("/home");
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <h1>Create Account</h1>
          <p>Register to start analyzing your soil</p>
        </div>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="auth-form"
          initialValues={{ unit: "hectare", cropCategories: [] }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Your full name"
              disabled={isLoading}
            />
          </Form.Item>

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
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="Village"
            name="village"
            rules={[{ required: true, message: "Please enter your village" }]}
          >
            <Input
              prefix={<EnvironmentOutlined />}
              placeholder="Your village"
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            label="District"
            name="district"
            rules={[
              { required: true, message: "Please enter your district" },
            ]}
          >
            <Input placeholder="Your district" disabled={isLoading} />
          </Form.Item>

          <div className="dual-field-row">
            <Form.Item
              label="Landholding"
              name="landholding"
              rules={[
                { required: true, message: "Please enter your landholding" },
              ]}
            >
              <Input
                type="number"
                placeholder="0.00"
                disabled={isLoading}
                step="0.01"
              />
            </Form.Item>

            <Form.Item
              label="Unit"
              name="unit"
              rules={[{ required: true, message: "Please select a unit" }]}
            >
              <Select disabled={isLoading}>
                {UNITS.map((unit) => (
                  <Option key={unit} value={unit}>
                    {UNIT_LABELS[unit]}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            label="Crop Categories"
            name="cropCategories"
            rules={[
              { required: true, message: "Please select at least one crop" },
            ]}
          >
            <Checkbox.Group
              className="crop-checkboxes"
              disabled={isLoading}
            >
              {CROPS.map((crop) => (
                <Checkbox key={crop} value={crop}>
                  {crop}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              block
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>
        </Form>

        <div className="auth-note" style={{ textAlign: "center", marginTop: "16px" }}>
          <Text>
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </Text>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
