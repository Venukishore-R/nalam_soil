import { Button, Form, Input } from "antd";
import type { FormInstance } from "antd";
import type { LoginFormData } from "../types/forms";
import type { StatusState } from "../types/status";
import StatusMessage from "./StatusMessage";

interface LoginFormProps {
  form: FormInstance<LoginFormData>;
  status: StatusState;
  initialValues: LoginFormData;
  onFinish: (values: LoginFormData) => void;
}

export default function LoginForm({
  form,
  status,
  initialValues,
  onFinish,
}: LoginFormProps) {
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        className="space-y-4"
      >
        <Form.Item
          label="Mobile number"
          name="mobileNumber"
          rules={[
            { required: true, message: "Enter the registered mobile number" },
          ]}
        >
          <Input
            placeholder="Registered number"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter the password" }]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            size="large"
            className="rounded-lg bg-gradient-to-r from-rose-900 to-orange-500 text-base font-semibold text-white tracking-tight shadow-lg shadow-rose-900/30"
            htmlType="submit"
            type="primary"
            loading={status.state === "pending"}
          >
            {status.state === "pending" ? "Verifying…" : "Log in"}
          </Button>
        </Form.Item>
      </Form>

      <StatusMessage status={status} prefix="Login" />

    </>
  );
}
