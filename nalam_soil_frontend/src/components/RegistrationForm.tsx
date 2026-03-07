import { Button, Form, Input, Select } from "antd";
import type { FormInstance } from "antd";
import type { RegistrationFormData } from "../types/forms";
import type { StatusState } from "../types/status";
import type { LandUnit } from "../utils/constants";
import StatusMessage from "./StatusMessage";

interface RegistrationFormProps {
  form: FormInstance<RegistrationFormData>;
  status: StatusState;
  landUnits: readonly LandUnit[];
  initialValues: RegistrationFormData;
  onFinish: (values: RegistrationFormData) => void;
}

export default function RegistrationForm({
  form,
  status,
  landUnits,
  initialValues,
  onFinish,
}: RegistrationFormProps) {
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please add the farmer name" }]}
        >
          <Input placeholder="Full name" size="middle" className="rounded-lg" />
        </Form.Item>

        <Form.Item
          label="Mobile number"
          name="mobileNumber"
          rules={[{ required: true, message: "Mobile number is required" }]}
        >
          <Input
            placeholder="e.g., 9876543210"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Set a password" }]}
        >
          <Input.Password
            placeholder="Create a password"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="Village"
          name="village"
          rules={[{ required: true, message: "Village is required" }]}
        >
          <Input
            placeholder="Village name"
            size="middle"
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item
          label="District"
          name="district"
          rules={[{ required: true, message: "District is required" }]}
        >
          <Input placeholder="District" size="middle" className="rounded-lg`" />
        </Form.Item>

        <div className="grid gap-4 md:grid-cols-2">
          <Form.Item
            label="Landholding"
            name="landValue"
            rules={[
              { required: true, message: "Landholding value is required" },
            ]}
            className="mb-0"
          >
            <Input
              type="number"
              min={0}
              step={0.01}
              placeholder="Area"
              size="middle"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Unit"
            name="landUnit"
            rules={[{ required: true, message: "Select a land unit" }]}
            className="mb-0"
          >
            <Select
              size="middle"
              className="rounded-lg"
              options={landUnits.map((unit) => ({
                value: unit.value,
                label: unit.label,
              }))}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Crop categories"
          name="cropCategories"
          rules={[
            { required: true, message: "Add at least one crop category" },
          ]}
        >
          <Input
            placeholder="Comma-separated list"
            size="middle"
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
            {status.state === "pending" ? "Creating…" : "Create account"}
          </Button>
        </Form.Item>
      </Form>

      <StatusMessage status={status} prefix="Registration" />
    </>
  );
}
