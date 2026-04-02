"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const db_1 = require("../db");
const router = (0, express_1.Router)();
exports.authRouter = router;
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    mobileNumber: zod_1.z.string().regex(/^[0-9]{10}$/),
    password: zod_1.z.string().min(6),
    village: zod_1.z.string().min(1),
    district: zod_1.z.string().min(1),
    landholding: zod_1.z.number().positive(),
    unit: zod_1.z.enum(["hectare", "acre", "square_meter"]),
    cropCategories: zod_1.z.array(zod_1.z.enum(["Sorghum", "Sugarcane", "Paddy", "Radish", "Tapioca"])),
});
const loginSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string().regex(/^[0-9]{10}$/),
    password: zod_1.z.string().min(6),
});
router.post("/register", async (req, res) => {
    try {
        const data = registerSchema.parse(req.body);
        const existing = (0, db_1.getUserByMobile)(data.mobileNumber);
        if (existing) {
            return res
                .status(409)
                .json({ success: false, error: "Mobile number already registered" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = {
            ...data,
            password: hashedPassword,
            cropCategories: JSON.stringify(data.cropCategories),
        };
        const { id } = (0, db_1.createUser)(user);
        return res.status(201).json({
            success: true,
            data: {
                id,
                name: data.name,
                mobileNumber: data.mobileNumber,
                village: data.village,
                district: data.district,
                landholding: data.landholding,
                unit: data.unit,
                cropCategories: data.cropCategories,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: error.errors,
            });
        }
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
});
router.post("/login", async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);
        const existing = (0, db_1.getUserByMobile)(data.mobileNumber);
        if (!existing) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid credentials" });
        }
        const valid = await bcryptjs_1.default.compare(data.password, existing.password);
        if (!valid) {
            return res
                .status(401)
                .json({ success: false, error: "Invalid credentials" });
        }
        return res.json({
            success: true,
            data: {
                id: existing.id,
                name: existing.name,
                mobileNumber: existing.mobileNumber,
                village: existing.village,
                district: existing.district,
                landholding: existing.landholding,
                unit: existing.unit,
                cropCategories: JSON.parse(existing.cropCategories),
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                error: "Validation failed",
                details: error.errors,
            });
        }
        return res
            .status(500)
            .json({ success: false, error: "Internal server error" });
    }
});
