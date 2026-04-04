import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  village: z.string().min(1, "Village is required"),
  district: z.string().min(1, "District is required"),
  landholding: z.coerce.number().positive("Landholding must be positive"),
  unit: z.enum(["hectare", "acre", "square_meter"]),
  cropCategories: z
    .array(z.enum(["Sorghum", "Sugarcane", "Paddy", "Radish", "Tapioca"]))
    .min(1, "Select at least one crop"),
});

export const loginSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  password: z.string().min(6, "Password is required"),
});

export const soilTestSchema = z
  .object({
    cropName: z.enum(["Sorghum", "Sugarcane", "Paddy", "Radish", "Tapioca"]),
    soilType: z.string().optional(),
    variety: z.string().optional(),
    dayAfterPlanting: z.coerce.number().optional(),
    growthStage: z.string().optional(),
    landholdingOfCrop: z.coerce
      .number()
      .positive("Landholding must be positive"),
    unit: z.enum(["hectare", "acre", "square_meter"]),
  })
  .refine(
    (data) => {
      // Soil type is required for Sugarcane and Sorghum
      if (
        (data.cropName === "Sugarcane" || data.cropName === "Sorghum") &&
        !data.soilType
      ) {
        return false;
      }
      return true;
    },
    { message: "Soil type is required for this crop", path: ["soilType"] },
  )
  .refine(
    (data) => {
      // Variety is required for Sorghum and Paddy
      if (
        (data.cropName === "Sorghum" || data.cropName === "Paddy") &&
        !data.variety
      ) {
        return false;
      }
      return true;
    },
    { message: "Variety is required for this crop", path: ["variety"] },
  )
  .refine(
    (data) => {
      // Day after planting is required for Paddy, Radish, and Tapioca
      if (
        (data.cropName === "Paddy" ||
          data.cropName === "Radish" ||
          data.cropName === "Tapioca") &&
        !data.dayAfterPlanting
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Days after planting is required for this crop",
      path: ["dayAfterPlanting"],
    },
  )
  .refine(
    (data) => {
      if (
        (data.cropName === "Radish" || data.cropName === "Tapioca") &&
        !data.growthStage
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Growth stage is required for this crop",
      path: ["growthStage"],
    },
  );

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SoilTestFormData = z.infer<typeof soilTestSchema>;
