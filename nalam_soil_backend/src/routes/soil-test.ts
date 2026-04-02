import { Router, Request, Response } from "express";
import { soilTestSchema } from "../lib/validations";
import { convertToAcres } from "../lib/crop-data";
import { analyzeNutrients } from "../lib/nutrient-analyzer";

const router = Router();

router.post("/soil-test", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Validate input
    const validatedData = soilTestSchema.parse(body);

    // Convert landholding to acres
    const landholdingAcres = convertToAcres(
      validatedData.landholdingOfCrop,
      validatedData.unit,
    );

    // Extract nutrient values from request (these would come from soil test device/sensor)
    const nutrients = {
      nitrogen: body.nitrogen || 250, // placeholder - in real app comes from sensor
      phosphorous: body.phosphorous || 20,
      potassium: body.potassium || 200,
    };

    // Analyze nutrients
    const analysisResult = analyzeNutrients(
      nutrients,
      validatedData.cropName,
      landholdingAcres,
    );

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
