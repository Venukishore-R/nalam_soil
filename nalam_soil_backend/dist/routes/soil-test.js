"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soilTestRouter = void 0;
const express_1 = require("express");
const validations_1 = require("../lib/validations");
const crop_data_1 = require("../lib/crop-data");
const nutrient_analyzer_1 = require("../lib/nutrient-analyzer");
const sensor_store_1 = require("../lib/sensor-store");
const crop_fertilizer_1 = require("../lib/crop-fertilizer");
const router = (0, express_1.Router)();
exports.soilTestRouter = router;
router.post("/soil-test", async (req, res) => {
    try {
        const body = req.body;
        console.log("[SoilTest] payload", body);
        // Validate input
        const validatedData = validations_1.soilTestSchema.parse(body);
        // Convert landholding to acres
        const landholdingAcres = (0, crop_data_1.convertToAcres)(validatedData.landholdingOfCrop, validatedData.unit);
        // Extract nutrient values from request (these would come from soil test device/sensor)
        const latestSensor = (0, sensor_store_1.getLatestSensorRecord)();
        const defaultSensor = {
            id: 0,
            timestamp: new Date().toISOString(),
            nitrogen: 250,
            phosphorous: 20,
            potassium: 200,
        };
        const sensorData = latestSensor ?? defaultSensor;
        // Analyze nutrients
        const analysisResult = (0, nutrient_analyzer_1.analyzeNutrients)(sensorData, validatedData.cropName, landholdingAcres);
        const finalRecommendation = crop_fertilizer_1.SUPPORTED_FERTILIZER_CROPS.includes(validatedData.cropName)
            ? (0, crop_fertilizer_1.calculateCropRecommendation)({
                cropType: validatedData.cropName,
                sensor: sensorData,
                soilType: validatedData.soilType || null,
                variety: validatedData.variety || null,
                growthStage: validatedData.growthStage || null,
                unit: validatedData.unit,
                landholding: validatedData.landholdingOfCrop,
                landholdingInAcres: landholdingAcres,
            })
            : null;
        console.log("[SoilTest] sensor", sensorData, "landholdingAcres", landholdingAcres);
        console.log("[SoilTest] finalRecommendation", finalRecommendation);
        // Prepare response
        const response = {
            success: true,
            data: {
                testId: `TEST-${Date.now()}`,
                timestamp: new Date().toISOString(),
                cropName: validatedData.cropName,
                soilType: validatedData.soilType || null,
                variety: validatedData.variety || null,
                growthStage: validatedData.growthStage || null,
                dayAfterPlanting: validatedData.dayAfterPlanting || null,
                originalLandholding: {
                    value: validatedData.landholdingOfCrop,
                    unit: validatedData.unit,
                },
                landholdingOfCrop: validatedData.landholdingOfCrop,
                unit: validatedData.unit,
                landholdingInAcres: parseFloat(landholdingAcres.toFixed(2)),
                nutrients: {
                    nitrogen: sensorData.nitrogen,
                    phosphorous: sensorData.phosphorous,
                    potassium: sensorData.potassium,
                },
                analysis: analysisResult,
                finalRecommendation,
            },
        };
        res.json(response);
    }
    catch (error) {
        if (error instanceof Error) {
            // Check if it's a Zod validation error
            if (error.name === "ZodError") {
                res.status(400).json({
                    success: false,
                    error: "Validation failed",
                    details: error.message,
                });
                return;
            }
            res.status(500).json({
                success: false,
                error: error.message,
            });
            return;
        }
        res.status(500).json({
            success: false,
            error: "An unknown error occurred",
        });
    }
});
