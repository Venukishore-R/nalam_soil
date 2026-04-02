"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soilTestRouter = void 0;
const express_1 = require("express");
const validations_1 = require("../lib/validations");
const crop_data_1 = require("../lib/crop-data");
const nutrient_analyzer_1 = require("../lib/nutrient-analyzer");
const router = (0, express_1.Router)();
exports.soilTestRouter = router;
router.post("/soil-test", async (req, res) => {
    try {
        const body = req.body;
        // Validate input
        const validatedData = validations_1.soilTestSchema.parse(body);
        // Convert landholding to acres
        const landholdingAcres = (0, crop_data_1.convertToAcres)(validatedData.landholdingOfCrop, validatedData.unit);
        // Extract nutrient values from request (these would come from soil test device/sensor)
        const nutrients = {
            nitrogen: body.nitrogen || 250, // placeholder - in real app comes from sensor
            phosphorous: body.phosphorous || 20,
            potassium: body.potassium || 200,
        };
        // Analyze nutrients
        const analysisResult = (0, nutrient_analyzer_1.analyzeNutrients)(nutrients, validatedData.cropName, landholdingAcres);
        // Prepare response
        const response = {
            success: true,
            data: {
                testId: `TEST-${Date.now()}`,
                timestamp: new Date().toISOString(),
                cropName: validatedData.cropName,
                soilType: validatedData.soilType || null,
                variety: validatedData.variety || null,
                dayAfterPlanting: validatedData.dayAfterPlanting || null,
                originalLandholding: {
                    value: validatedData.landholdingOfCrop,
                    unit: validatedData.unit,
                },
                landholdingInAcres: parseFloat(landholdingAcres.toFixed(2)),
                nutrients: {
                    nitrogen: nutrients.nitrogen,
                    phosphorous: nutrients.phosphorous,
                    potassium: nutrients.potassium,
                },
                analysis: analysisResult,
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
