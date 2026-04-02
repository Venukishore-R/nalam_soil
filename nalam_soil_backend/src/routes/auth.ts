import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createUser, getUserByMobile } from "../db";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  mobileNumber: z.string().regex(/^[0-9]{10}$/),
  password: z.string().min(6),
  village: z.string().min(1),
  district: z.string().min(1),
  landholding: z.number().positive(),
  unit: z.enum(["hectare", "acre", "square_meter"]),
  cropCategories: z.array(
    z.enum(["Sorghum", "Sugarcane", "Paddy", "Radish", "Tapioca"]),
  ),
});

const loginSchema = z.object({
  mobileNumber: z.string().regex(/^[0-9]{10}$/),
  password: z.string().min(6),
});

router.post("/register", async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = getUserByMobile(data.mobileNumber);
    if (existing) {
      return res
        .status(409)
        .json({ success: false, error: "Mobile number already registered" });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = {
      ...data,
      password: hashedPassword,
      cropCategories: JSON.stringify(data.cropCategories),
    };

    const { id } = createUser(user as any);

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
  } catch (error) {
    if (error instanceof z.ZodError) {
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

    const existing = getUserByMobile(data.mobileNumber);
    if (!existing) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(data.password, existing.password);
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
  } catch (error) {
    if (error instanceof z.ZodError) {
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

export { router as authRouter };
