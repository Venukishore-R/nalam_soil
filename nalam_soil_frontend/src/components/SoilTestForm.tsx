import React from "react";
import { Form, Input, Button, Select, message } from "antd";
import axios from "axios";
import {
  CROPS,
  SOIL_TYPES,
  VARIETIES,
  DAYS_AFTER_PLANTING,
  CROP_GROWTH_STAGES,
} from "../lib/crop-data";
const { Option } = Select;

interface SoilTestFormProps {
  onSubmit?: (data: any) => void;
  onClose?: () => void;
}

function SoilTestForm({ onSubmit, onClose }: SoilTestFormProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = React.useState(false);
  const cropName = Form.useWatch("cropName", form);
  const showsGrowthStageField =
    cropName === "Radish" || cropName === "Tapioca";

  const handleFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/soil-test", values);
      if (response.data.success) {
        message.success("Soil test completed successfully!");
        onSubmit?.(response.data.data);
        onClose?.();
      } else {
        message.error(response.data.error || "Test failed");
      }
    } catch (error) {
      console.error("Soil test error:", error);
      message.error("Soil test failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="soil-test-form">
      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        initialValues={{ unit: "hectare" }}
      >
        <Form.Item
          label="Crop Name"
          name="cropName"
          rules={[{ required: true, message: "Please select a crop" }]}
        >
          <Select placeholder="Select crop">
            {CROPS.map((crop) => (
              <Option key={crop} value={crop}>
                {crop}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {SOIL_TYPES[cropName as keyof typeof SOIL_TYPES] && (
          <Form.Item
            label="Soil Type"
            name="soilType"
            rules={[{ required: true, message: "Please select soil type" }]}
          >
            <Select placeholder="Select soil type">
              {SOIL_TYPES[cropName as keyof typeof SOIL_TYPES]?.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {VARIETIES[cropName as keyof typeof VARIETIES] && (
          <Form.Item
            label="Variety"
            name="variety"
            rules={[{ required: true, message: "Please select variety" }]}
          >
            <Select placeholder="Select variety">
              {VARIETIES[cropName as keyof typeof VARIETIES]?.map((variety) => (
                <Option key={variety} value={variety}>
                  {variety}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {showsGrowthStageField && (
          <Form.Item
            label="Growth Stage"
            name="growthStage"
            rules={[
              {
                required: true,
                message: "Please select the growth stage",
              },
            ]}
          >
            <Select placeholder="Select stage">
              {CROP_GROWTH_STAGES[
                cropName as keyof typeof CROP_GROWTH_STAGES
              ]?.map((stage) => (
                <Option key={stage} value={stage}>
                  {stage}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {DAYS_AFTER_PLANTING[cropName as keyof typeof DAYS_AFTER_PLANTING] && (
          <Form.Item
            label="Days After Planting"
            name="dayAfterPlanting"
            rules={[
              { required: true, message: "Please enter days after planting" },
            ]}
          >
            <Select placeholder="Select days after planting">
              {DAYS_AFTER_PLANTING[
                cropName as keyof typeof DAYS_AFTER_PLANTING
              ]?.map((day) => (
                <Option key={day} value={day}>
                  {day} days
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label="Landholding of Crop"
          name="landholdingOfCrop"
          rules={[{ required: true, message: "Please enter landholding" }]}
        >
          <Input type="number" placeholder="Landholding value" />
        </Form.Item>

        <Form.Item
          label="Unit"
          name="unit"
          rules={[{ required: true, message: "Please select unit" }]}
        >
          <Select>
            <Option value="hectare">Hectare (ha)</Option>
            <Option value="acre">Acre</Option>
            <Option value="square_meter">Square Meter (m²)</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            {isLoading ? "Running Test..." : "Run Soil Test"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SoilTestForm;
