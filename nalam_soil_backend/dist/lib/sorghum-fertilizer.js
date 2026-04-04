"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSorghumRecommendation = calculateSorghumRecommendation;
const crop_data_1 = require("./crop-data");
const SORGHUM_FORMULAS = {
    red: {
        intercepts: {
            nitrogen: 4.86 * 50,
            phosphorous: 1.63 * 50,
            potassium: 4.56 * 50,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 0.55,
                phosphorous: 0.98,
            },
            phosphorous: {
                phosphorous: 0.87,
                potassium: 0.9,
            },
            potassium: {
                potassium: 0.59,
                nitrogen: 0.76,
            },
        },
    },
    black: {
        intercepts: {
            nitrogen: 6.06 * 50,
            phosphorous: 2.06 * 50,
            potassium: 5.03 * 50,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 0.81,
                phosphorous: 0.53,
            },
            phosphorous: {
                phosphorous: 3.14,
                potassium: 0.72,
            },
            potassium: {
                potassium: 0.47,
                nitrogen: 0.66,
            },
        },
    },
};
const AREA_LABELS = {
    acre: "acre",
    hectare: "ha",
    square_meter: "m²",
};
const BASE_FERTILIZERS = [
    {
        label: "Farm Yard Manure (FYM)",
        rate: 5,
        rateUnit: "acre",
        massUnit: "tons",
    },
    {
        label: "Azospirillum",
        rate: 1,
        rateUnit: "acre",
        massUnit: "kg",
    },
    {
        label: "PSB",
        rate: 1,
        rateUnit: "acre",
        massUnit: "kg",
    },
    {
        label: "Vermicompost",
        rate: 2.5,
        rateUnit: "hectare",
        massUnit: "tons",
    },
];
function clamp(value) {
    return Math.max(0, value);
}
function resolveSoilGroup(soilType) {
    if (!soilType) {
        return "red";
    }
    const normalized = soilType.toLowerCase();
    if (normalized.includes("calcare") || normalized.includes("black")) {
        return "black";
    }
    return "red";
}
function computeNutrientTargets(sensor, soilGroup) {
    const formula = SORGHUM_FORMULAS[soilGroup];
    const nitrogen = formula.intercepts.nitrogen -
        formula.coefficients.nitrogen.nitrogen * sensor.nitrogen -
        formula.coefficients.nitrogen.phosphorous * sensor.phosphorous;
    const phosphorous = formula.intercepts.phosphorous -
        formula.coefficients.phosphorous.phosphorous * sensor.phosphorous -
        formula.coefficients.phosphorous.potassium * sensor.potassium;
    const potassium = formula.intercepts.potassium -
        formula.coefficients.potassium.potassium * sensor.potassium -
        formula.coefficients.potassium.nitrogen * sensor.nitrogen;
    return {
        nitrogen: clamp(nitrogen),
        phosphorous: clamp(phosphorous),
        potassium: clamp(potassium),
    };
}
function formatPerUnitLabel(massUnit, unit) {
    return `${massUnit}/${AREA_LABELS[unit]}`;
}
function calculateSorghumRecommendation(params) {
    const soilGroup = resolveSoilGroup(params.soilType);
    const nutrientTargetsPerHa = computeNutrientTargets(params.sensor, soilGroup);
    const perAcreNutrients = {
        nitrogen: (0, crop_data_1.convertPerHectareToPerAcre)(nutrientTargetsPerHa.nitrogen),
        phosphorous: (0, crop_data_1.convertPerHectareToPerAcre)(nutrientTargetsPerHa.phosphorous),
        potassium: (0, crop_data_1.convertPerHectareToPerAcre)(nutrientTargetsPerHa.potassium),
    };
    const perAcreFertilizers = {
        urea: clamp(perAcreNutrients.nitrogen / 0.46),
        ssp: clamp(perAcreNutrients.phosphorous / 0.16),
        mop: clamp(perAcreNutrients.potassium / 0.6),
    };
    const perUserUnit = {
        urea: (0, crop_data_1.convertPerAcreToUnit)(perAcreFertilizers.urea, params.unit),
        ssp: (0, crop_data_1.convertPerAcreToUnit)(perAcreFertilizers.ssp, params.unit),
        mop: (0, crop_data_1.convertPerAcreToUnit)(perAcreFertilizers.mop, params.unit),
    };
    const totals = {
        urea: perUserUnit.urea * params.landholding,
        ssp: perUserUnit.ssp * params.landholding,
        mop: perUserUnit.mop * params.landholding,
    };
    const baseFertilizers = BASE_FERTILIZERS.map((entry) => {
        const perAcreRate = entry.rateUnit === "acre"
            ? entry.rate
            : entry.rate / crop_data_1.UNIT_CONVERSION.hectare_to_acre;
        const perUnitValue = (0, crop_data_1.convertPerAcreToUnit)(perAcreRate, params.unit);
        const totalValue = perUnitValue * params.landholding;
        return {
            label: entry.label,
            perUnitValue,
            perUnitLabel: formatPerUnitLabel(entry.massUnit, params.unit),
            totalValue,
            totalUnit: entry.massUnit,
        };
    });
    return {
        unit: params.unit,
        landholding: params.landholding,
        landholdingInAcres: params.landholdingInAcres,
        soilType: params.soilType,
        soilGroup,
        perUserUnit: {
            urea: {
                value: perUserUnit.urea,
                unit: formatPerUnitLabel("kg", params.unit),
            },
            ssp: {
                value: perUserUnit.ssp,
                unit: formatPerUnitLabel("kg", params.unit),
            },
            mop: {
                value: perUserUnit.mop,
                unit: formatPerUnitLabel("kg", params.unit),
            },
        },
        totals: {
            urea: {
                value: totals.urea,
                unit: "kg",
            },
            ssp: {
                value: totals.ssp,
                unit: "kg",
            },
            mop: {
                value: totals.mop,
                unit: "kg",
            },
        },
        baseFertilizers,
    };
}
