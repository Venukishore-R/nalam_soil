import { Router, Request, Response } from "express";
import { soilTestSchema } from "../lib/validations";
import { convertToAcres } from "../lib/crop-data";
import { analyzeNutrients } from "../lib/nutrient-analyzer";
import { getLatestSensorRecord, SensorRecord } from "../lib/sensor-store";
import {
  calculateCropRecommendation,
  SUPPORTED_FERTILIZER_CROPS,
} from "../lib/crop-fertilizer";

const router = Router();

router.post("/soil-test", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    console.log("[SoilTest] payload", body);
    // Validate input
    const validatedData = soilTestSchema.parse(body);

    // Convert landholding to acres
    const landholdingAcres = convertToAcres(
      validatedData.landholdingOfCrop,
      validatedData.unit,
    );

    // Extract nutrient values from request (these would come from soil test device/sensor)
    const latestSensor = getLatestSensorRecord();
    const defaultSensor: SensorRecord = {
      id: 0,
      timestamp: new Date().toISOString(),
      nitrogen: 250,
      phosphorous: 20,
      potassium: 200,
    };
    const sensorData = latestSensor ?? defaultSensor;

    // Analyze nutrients
    const analysisResult = analyzeNutrients(
      sensorData,
      validatedData.cropName,
      landholdingAcres,
    );

    const finalRecommendation = SUPPORTED_FERTILIZER_CROPS.includes(
      validatedData.cropName,
    )
      ? calculateCropRecommendation({
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
  } catch (error) {
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

export { router as soilTestRouter };
