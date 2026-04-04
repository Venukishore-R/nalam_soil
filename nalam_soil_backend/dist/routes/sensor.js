"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sensorRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const sensor_store_1 = require("../lib/sensor-store");
const router = (0, express_1.Router)();
exports.sensorRouter = router;
const sensorSchema = zod_1.z.object({
    nitrogen: zod_1.z.number().nonnegative(),
    phosphorous: zod_1.z.number().nonnegative(),
    potassium: zod_1.z.number().nonnegative(),
});
router.post("/sensor-data", (req, res) => {
    try {
        const data = sensorSchema.parse(req.body);
        console.log(`[SensorData] Received nitrogen=${data.nitrogen}, phosphorous=${data.phosphorous}, potassium=${data.potassium}`);
        const record = (0, sensor_store_1.addSensorRecord)(data);
        return res.status(201).json({ success: true, data: record });
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
router.get("/sensor-data", (_, res) => {
    return res.json({ success: true, data: (0, sensor_store_1.getSensorHistory)() });
});
