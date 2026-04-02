"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeNutrients = analyzeNutrients;
// Optimal nutrient ranges for different crops (mg/kg)
const NUTRIENT_RANGES = {
    Paddy: {
        nitrogen: [200, 400],
        phosphorous: [15, 30],
        potassium: [150, 300],
    },
    Sorghum: {
        nitrogen: [150, 300],
        phosphorous: [12, 25],
        potassium: [100, 250],
    },
    Sugarcane: {
        nitrogen: [250, 400],
        phosphorous: [20, 40],
        potassium: [200, 400],
    },
    Radish: {
        nitrogen: [180, 350],
        phosphorous: [15, 30],
        potassium: [120, 280],
    },
    Tapioca: {
        nitrogen: [200, 350],
        phosphorous: [15, 28],
        potassium: [180, 350],
    },
};
// Expected yield ranges for different crops (kg/acre)
const YIELD_POTENTIAL = {
    Paddy: { low: 2500, medium: 4500, high: 6000 },
    Sorghum: { low: 1500, medium: 2500, high: 3500 },
    Sugarcane: { low: 40000, medium: 60000, high: 80000 },
    Radish: { low: 15000, medium: 25000, high: 35000 },
    Tapioca: { low: 12000, medium: 20000, high: 30000 },
};
function getNutrientStatus(value, cropType, nutrient) {
    const range = NUTRIENT_RANGES[cropType][nutrient];
    const [low, high] = range;
    if (value < low * 0.7) {
        return {
            level: "Low",
            recommendation: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} level is critically low. Apply high-dose fertilizers or organic supplements immediately.`,
        };
    }
    else if (value < low) {
        return {
            level: "Low",
            recommendation: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} level is below optimal. Consider applying moderate amount of fertilizer.`,
        };
    }
    else if (value > high * 1.3) {
        return {
            level: "High",
            recommendation: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} level is excessively high. Avoid additional applications to prevent crop damage.`,
        };
    }
    else if (value > high) {
        return {
            level: "High",
            recommendation: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} level is above optimal. Reduce fertilizer application.`,
        };
    }
    else {
        return {
            level: "Medium",
            recommendation: `${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} level is optimal. Maintain current management practices.`,
        };
    }
}
function calculateYieldEstimate(nutrients, cropType, landholdingAcres) {
    const potentials = YIELD_POTENTIAL[cropType];
    const ranges = NUTRIENT_RANGES[cropType];
    // Calculate nutrient score (0-1) based on how close to optimal ranges
    const nitrogenScore = Math.min(nutrients.nitrogen / ranges.nitrogen[1], 1);
    const phosphorousScore = Math.min(nutrients.phosphorous / ranges.phosphorous[1], 1);
    const potassiumScore = Math.min(nutrients.potassium / ranges.potassium[1], 1);
    // Average nutrient score
    const avgNutrientScore = (nitrogenScore + phosphorousScore + potassiumScore) / 3;
    // Calculate yields based on nutrient availability
    const optimistic = potentials.high * avgNutrientScore * landholdingAcres;
    const realistic = potentials.medium * avgNutrientScore * landholdingAcres;
    const conservative = potentials.low * avgNutrientScore * landholdingAcres;
    return {
        optimistic: Math.round(optimistic),
        realistic: Math.round(realistic),
        conservative: Math.round(conservative),
    };
}
function analyzeNutrients(nutrients, cropType, landholdingAcres) {
    const nitrogenStatus = getNutrientStatus(nutrients.nitrogen, cropType, "nitrogen");
    const phosphorousStatus = getNutrientStatus(nutrients.phosphorous, cropType, "phosphorous");
    const potassiumStatus = getNutrientStatus(nutrients.potassium, cropType, "potassium");
    // Count how many nutrients are optimal
    const optimalCount = [
        nitrogenStatus,
        phosphorousStatus,
        potassiumStatus,
    ].filter((s) => s.level === "Medium").length;
    let overallRecommendation = "";
    if (optimalCount === 3) {
        overallRecommendation = `Excellent! All nutrients are at optimal levels for ${cropType}. Your soil is in great condition for cultivation. Expected yield: ${YIELD_POTENTIAL[cropType].high}+ kg/acre.`;
    }
    else if (optimalCount === 2) {
        overallRecommendation = `Good soil health overall. Most nutrients are optimal. Minor adjustments recommended for better yield.`;
    }
    else if (optimalCount === 1) {
        overallRecommendation = `Moderate soil health. Several nutrients need attention. Consider balanced fertilizer application.`;
    }
    else {
        overallRecommendation = `Poor soil health. Multiple nutrients are deficient. Immediate soil amendment is recommended. Consult a soil expert for detailed guidance.`;
    }
    const estimatedYield = calculateYieldEstimate(nutrients, cropType, landholdingAcres);
    return {
        nitrogen: nitrogenStatus,
        phosphorous: phosphorousStatus,
        potassium: potassiumStatus,
        overallRecommendation,
        estimatedYield,
    };
}
