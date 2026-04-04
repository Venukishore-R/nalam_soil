"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soilTestSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name must be at least 2 characters"),
    mobileNumber: zod_1.z
        .string()
        .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    village: zod_1.z.string().min(1, "Village is required"),
    district: zod_1.z.string().min(1, "District is required"),
    landholding: zod_1.z.coerce.number().positive("Landholding must be positive"),
    unit: zod_1.z.enum(["hectare", "acre", "square_meter"]),
    cropCategories: zod_1.z
        .array(zod_1.z.enum(["Sorghum", "Sugarcane", "Paddy", "Radish", "Tapioca"]))
        .min(1, "Select at least one crop"),
});
exports.loginSchema = zod_1.z.object({
    mobileNumber: zod_1.z
        .string()
        .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
    password: zod_1.z.string().min(6, "Password is required"),
});
exports.soilTestSchema = zod_1.z
    .object({
    cropName: zod_1.z.enum(["Sorghum", "Sugarcane", "Paddy", "Radish", "Tapioca"]),
    soilType: zod_1.z.string().optional(),
    variety: zod_1.z.string().optional(),
    dayAfterPlanting: zod_1.z.coerce.number().optional(),
    growthStage: zod_1.z.string().optional(),
    landholdingOfCrop: zod_1.z.coerce
        .number()
        .positive("Landholding must be positive"),
    unit: zod_1.z.enum(["hectare", "acre", "square_meter"]),
})
    .refine((data) => {
    // Soil type is required for Sugarcane and Sorghum
    if ((data.cropName === "Sugarcane" || data.cropName === "Sorghum") &&
        !data.soilType) {
        return false;
    }
    return true;
}, { message: "Soil type is required for this crop", path: ["soilType"] })
    .refine((data) => {
    // Variety is required for Sorghum and Paddy
    if ((data.cropName === "Sorghum" || data.cropName === "Paddy") &&
        !data.variety) {
        return false;
    }
    return true;
}, { message: "Variety is required for this crop", path: ["variety"] })
    .refine((data) => {
    // Day after planting is required for Paddy, Radish, and Tapioca
    if ((data.cropName === "Paddy" ||
        data.cropName === "Radish" ||
        data.cropName === "Tapioca") &&
        !data.dayAfterPlanting) {
        return false;
    }
    return true;
}, {
    message: "Days after planting is required for this crop",
    path: ["dayAfterPlanting"],
})
    .refine((data) => {
    if ((data.cropName === "Radish" || data.cropName === "Tapioca") &&
        !data.growthStage) {
        return false;
    }
    return true;
}, {
    message: "Growth stage is required for this crop",
    path: ["growthStage"],
});
