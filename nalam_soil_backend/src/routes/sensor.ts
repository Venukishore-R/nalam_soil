import { Router } from "express";
import { z } from "zod";
import {
  addSensorRecord,
  getSensorHistory,
} from "../lib/sensor-store";

const router = Router();

const sensorSchema = z.object({
  nitrogen: z.number().nonnegative(),
  phosphorous: z.number().nonnegative(),
  potassium: z.number().nonnegative(),
});

router.post("/sensor-data", (req, res) => {
  try {
    const data = sensorSchema.parse(req.body);

    console.log(
      `[SensorData] Received nitrogen=${data.nitrogen}, phosphorous=${data.phosphorous}, potassium=${data.potassium}`,
    );

    const record = addSensorRecord(data);

    return res.status(201).json({ success: true, data: record });
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

router.get("/sensor-data", (_, res) => {
  return res.json({ success: true, data: getSensorHistory() });
});

export { router as sensorRouter };
