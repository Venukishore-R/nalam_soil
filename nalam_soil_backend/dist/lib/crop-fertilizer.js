"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPPORTED_FERTILIZER_CROPS = void 0;
exports.calculateCropRecommendation = calculateCropRecommendation;
const crop_data_1 = require("./crop-data");
const SORGHUM_SOIL_FORMULAS = {
    red_sandy_loam: {
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
    black_calcareous: {
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
const SUGARCANE_SOIL_FORMULAS = {
    mixed_black_calcareous: {
        intercepts: {
            nitrogen: 4.17 * 150,
            phosphorous: 1.01 * 150,
            potassium: 3.44 * 150,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 1.9,
                phosphorous: 1.11,
            },
            phosphorous: {
                phosphorous: 0.56,
                potassium: 1.01,
            },
            potassium: {
                potassium: 0.84,
                nitrogen: 1.03,
            },
        },
    },
    red_coastal_alluvium: {
        intercepts: {
            nitrogen: 4.06 * 150,
            phosphorous: 1.15 * 150,
            potassium: 3.16 * 150,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 0.56,
                phosphorous: 0.93,
            },
            phosphorous: {
                phosphorous: 1.94,
                potassium: 0.98,
            },
            potassium: {
                potassium: 0.73,
                nitrogen: 0.99,
            },
        },
    },
    red_sandy_loam: {
        intercepts: {
            nitrogen: 3.42 * 150,
            phosphorous: 1.15 * 150,
            potassium: 3.16 * 150,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 0.58,
                phosphorous: 0.93,
            },
            phosphorous: {
                phosphorous: 1.94,
                potassium: 0.98,
            },
            potassium: {
                potassium: 0.73,
                nitrogen: 0.99,
            },
        },
    },
};
const CROP_SOIL_FORMULAS = {
    Sorghum: SORGHUM_SOIL_FORMULAS,
    Sugarcane: SUGARCANE_SOIL_FORMULAS,
};
const SOIL_KEY_KEYWORDS = {
    Sorghum: {
        red_sandy_loam: ["red", "sandy", "loam"],
        black_calcareous: ["black", "calcare"],
    },
    Sugarcane: {
        mixed_black_calcareous: ["mixed", "black", "calcare"],
        red_coastal_alluvium: ["red", "coastal"],
        red_sandy_loam: ["red", "sandy", "loam"],
    },
};
const DEFAULT_SOIL_KEY = {
    Sorghum: "red_sandy_loam",
    Sugarcane: "mixed_black_calcareous",
};
exports.SUPPORTED_FERTILIZER_CROPS = [
    "Sorghum",
    "Sugarcane",
    "Paddy",
    "Radish",
    "Tapioca",
];
const PADDY_VARIETY_TARGETS = {
    short_duration: { nitrogen: 61, phosphorous: 21, potassium: 21 },
    cauvery_delta: { nitrogen: 49, phosphorous: 17, potassium: 17 },
    other_tract: { nitrogen: 61, phosphorous: 21, potassium: 21 },
    medium_long: { nitrogen: 71, phosphorous: 24, potassium: 24 },
    ponni: { nitrogen: 31, phosphorous: 21, potassium: 21 },
};
const PADDY_VARIETY_KEY_MAP = {
    "short duration varieties [day season]": "short_duration",
    "cauvery delta & coimbatore tract": "cauvery_delta",
    "for other tract": "other_tract",
    "medium & long duration varieties [wet season]": "medium_long",
    ponni: "ponni",
};
function createPaddyFormula(target) {
    return {
        intercepts: {
            nitrogen: target.nitrogen,
            phosphorous: target.phosphorous,
            potassium: target.potassium,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 1,
                phosphorous: 0,
            },
            phosphorous: {
                phosphorous: 1,
                potassium: 0,
            },
            potassium: {
                potassium: 1,
                nitrogen: 0,
            },
        },
    };
}
const PADDY_VARIETY_FORMULAS = {
    short_duration: createPaddyFormula(PADDY_VARIETY_TARGETS.short_duration),
    cauvery_delta: createPaddyFormula(PADDY_VARIETY_TARGETS.cauvery_delta),
    other_tract: createPaddyFormula(PADDY_VARIETY_TARGETS.other_tract),
    medium_long: createPaddyFormula(PADDY_VARIETY_TARGETS.medium_long),
    ponni: createPaddyFormula(PADDY_VARIETY_TARGETS.ponni),
};
function resolvePaddyVarietyKey(variety) {
    const normalized = (variety ?? "").trim().toLowerCase();
    if (!normalized) {
        return "short_duration";
    }
    if (PADDY_VARIETY_KEY_MAP[normalized]) {
        return PADDY_VARIETY_KEY_MAP[normalized];
    }
    for (const [key, value] of Object.entries(PADDY_VARIETY_KEY_MAP)) {
        if (normalized.includes(key)) {
            return value;
        }
    }
    return "short_duration";
}
const RADISH_STAGE_TARGETS = {
    basal: { nitrogen: 0, phosphorous: 0, potassium: 0 },
    vegetative_stage: { nitrogen: 5, phosphorous: 4, potassium: 5 },
    early_root_development: { nitrogen: 11, phosphorous: 6, potassium: 11 },
    root_maturity: { nitrogen: 6, phosphorous: 2, potassium: 6 },
};
const RADISH_STAGE_KEY_MAP = {
    basal: "basal",
    "vegetative stage": "vegetative_stage",
    "early root development": "early_root_development",
    "root maturity": "root_maturity",
};
function resolveRadishStageKey(stage) {
    const normalized = (stage ?? "").trim().toLowerCase();
    if (!normalized) {
        return "vegetative_stage";
    }
    if (RADISH_STAGE_KEY_MAP[normalized]) {
        return RADISH_STAGE_KEY_MAP[normalized];
    }
    for (const [key, value] of Object.entries(RADISH_STAGE_KEY_MAP)) {
        if (normalized.includes(key)) {
            return value;
        }
    }
    return "vegetative_stage";
}
function buildStageFormula(target, sensor) {
    return {
        intercepts: {
            nitrogen: sensor.nitrogen + target.nitrogen,
            phosphorous: sensor.phosphorous + target.phosphorous,
            potassium: sensor.potassium + target.potassium,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 1,
                phosphorous: 0,
            },
            phosphorous: {
                phosphorous: 1,
                potassium: 0,
            },
            potassium: {
                potassium: 1,
                nitrogen: 0,
            },
        },
    };
}
const TAPIOCA_STAGE_TARGETS = {
    basal: { nitrogen: 18.86, phosphorous: 37, potassium: 49.2 },
    crop_establishment: { nitrogen: 4, phosphorous: 2, potassium: 10 },
    vegetative_stage: { nitrogen: 11, phosphorous: 3, potassium: 20 },
    tubers_formation: { nitrogen: 11, phosphorous: 3, potassium: 30 },
    tuber_development: { nitrogen: 11, phosphorous: 3, potassium: 40 },
};
const TAPIOCA_STAGE_KEY_MAP = {
    basal: "basal",
    "crop establishment": "crop_establishment",
    "vegetative stage": "vegetative_stage",
    "tubers formation": "tubers_formation",
    "tuber development": "tuber_development",
};
function createTapiocaFormula(target) {
    return {
        intercepts: {
            nitrogen: target.nitrogen,
            phosphorous: target.phosphorous,
            potassium: target.potassium,
        },
        coefficients: {
            nitrogen: {
                nitrogen: 1,
                phosphorous: 0,
            },
            phosphorous: {
                phosphorous: 1,
                potassium: 0,
            },
            potassium: {
                potassium: 1,
                nitrogen: 0,
            },
        },
    };
}
function resolveTapiocaStageKey(stage) {
    const normalized = (stage ?? "").trim().toLowerCase();
    if (!normalized) {
        return "crop_establishment";
    }
    if (TAPIOCA_STAGE_KEY_MAP[normalized]) {
        return TAPIOCA_STAGE_KEY_MAP[normalized];
    }
    for (const [key, value] of Object.entries(TAPIOCA_STAGE_KEY_MAP)) {
        if (normalized.includes(key)) {
            return value;
        }
    }
    return "crop_establishment";
}
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
        crops: ["Sorghum", "Sugarcane"],
    },
    {
        label: "Azospirillum",
        rate: 1,
        rateUnit: "acre",
        massUnit: "kg",
        crops: ["Sorghum", "Sugarcane"],
    },
    {
        label: "PSB",
        rate: 1,
        rateUnit: "acre",
        massUnit: "kg",
        crops: ["Sorghum", "Sugarcane"],
    },
    {
        label: "Vermicompost",
        rate: 2.5,
        rateUnit: "hectare",
        massUnit: "tons",
        crops: ["Sorghum", "Sugarcane"],
    },
];
const CROP_SPECIFIC_BASE_FERTILIZERS = {
    Paddy: [
        {
            label: "Zinc Sulphate",
            rate: 11,
            rateUnit: "acre",
            massUnit: "kg",
        },
        {
            label: "Farm Yard Manure (FYM)",
            rate: 6,
            rateUnit: "acre",
            massUnit: "kg",
        },
    ],
    Radish: [
        {
            label: "Farm Yard Manure (FYM)",
            rate: 11,
            rateUnit: "acre",
            massUnit: "tons",
            stage: "basal",
        },
        {
            label: "MOP",
            rate: 51,
            rateUnit: "acre",
            massUnit: "kg",
            stage: "basal",
        },
    ],
    Tapioca: [
        {
            label: "Farm Yard Manure (FYM)",
            rate: 11,
            rateUnit: "acre",
            massUnit: "tons",
            stage: "basal",
        },
        {
            label: "Urea",
            rate: 41,
            rateUnit: "acre",
            massUnit: "kg",
            stage: "basal",
        },
        {
            label: "SSP",
            rate: 231.25,
            rateUnit: "acre",
            massUnit: "kg",
            stage: "basal",
        },
        {
            label: "MOP",
            rate: 82,
            rateUnit: "acre",
            massUnit: "kg",
            stage: "basal",
        },
    ],
};
function clamp(value) {
    return Math.max(0, value);
}
function matchesKeywords(normalized, keywords) {
    if (!normalized) {
        return false;
    }
    return keywords.every((keyword) => normalized.includes(keyword));
}
function resolveSoilKey(cropType, soilType) {
    const formulas = CROP_SOIL_FORMULAS[cropType];
    const defaultKey = DEFAULT_SOIL_KEY[cropType] ??
        (formulas ? Object.keys(formulas)[0] ?? "" : "");
    if (!formulas) {
        return defaultKey;
    }
    const normalized = (soilType ?? "").toLowerCase();
    const keywordMap = SOIL_KEY_KEYWORDS[cropType] ?? {};
    for (const [key, keywords] of Object.entries(keywordMap)) {
        if (matchesKeywords(normalized, keywords)) {
            return key;
        }
    }
    for (const [key, keywords] of Object.entries(keywordMap)) {
        if (keywords.some((keyword) => normalized.includes(keyword))) {
            return key;
        }
    }
    return DEFAULT_SOIL_KEY[cropType] ?? "";
}
function computeNutrientTargets(sensor, formula) {
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
function calculateCropRecommendation(params) {
    const isPaddy = params.cropType === "Paddy";
    const isRadish = params.cropType === "Radish";
    const isTapioca = params.cropType === "Tapioca";
    const formulas = CROP_SOIL_FORMULAS[params.cropType];
    if (!isPaddy && !isRadish && !isTapioca && !formulas) {
        throw new Error(`No fertilizer matrix defined for ${params.cropType}`);
    }
    let soilKey = "";
    let resolvedVariety = params.variety ?? null;
    let resolvedStage = params.growthStage ?? null;
    let selectedFormula = null;
    let nutrientTargets;
    if (isPaddy) {
        const paddyKey = resolvePaddyVarietyKey(params.variety);
        soilKey = paddyKey;
        selectedFormula = PADDY_VARIETY_FORMULAS[paddyKey];
        nutrientTargets = computeNutrientTargets(params.sensor, selectedFormula);
    }
    else if (isRadish) {
        const stageKey = resolveRadishStageKey(params.growthStage);
        soilKey = stageKey;
        resolvedStage = params.growthStage ?? null;
        selectedFormula = buildStageFormula(RADISH_STAGE_TARGETS[stageKey], params.sensor);
        nutrientTargets = computeNutrientTargets(params.sensor, selectedFormula);
    }
    else if (isTapioca) {
        const stageKey = resolveTapiocaStageKey(params.growthStage);
        soilKey = stageKey;
        resolvedStage = params.growthStage ?? null;
        selectedFormula = buildStageFormula(TAPIOCA_STAGE_TARGETS[stageKey], params.sensor);
        nutrientTargets = computeNutrientTargets(params.sensor, selectedFormula);
    }
    else {
        soilKey = resolveSoilKey(params.cropType, params.soilType);
        selectedFormula = formulas[soilKey];
        nutrientTargets = computeNutrientTargets(params.sensor, selectedFormula);
    }
    const perAcreNutrients = isPaddy || isRadish || isTapioca
        ? nutrientTargets
        : {
            nitrogen: (0, crop_data_1.convertPerHectareToPerAcre)(nutrientTargets.nitrogen),
            phosphorous: (0, crop_data_1.convertPerHectareToPerAcre)(nutrientTargets.phosphorous),
            potassium: (0, crop_data_1.convertPerHectareToPerAcre)(nutrientTargets.potassium),
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
    const normalizedStage = (params.growthStage ?? "").trim().toLowerCase();
    const stageMatches = (entry) => !entry.stage || entry.stage.toLowerCase() === normalizedStage;
    const applicableBaseFertilizers = BASE_FERTILIZERS.filter((entry) => (!entry.crops || entry.crops.includes(params.cropType)) &&
        stageMatches(entry));
    const cropSpecificFertilizers = (CROP_SPECIFIC_BASE_FERTILIZERS[params.cropType] ?? []).filter(stageMatches);
    const fertilizerConfigs = [
        ...applicableBaseFertilizers,
        ...cropSpecificFertilizers,
    ];
    const baseFertilizers = fertilizerConfigs.map((entry) => {
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
        soilKey,
        growthStage: resolvedStage,
        variety: resolvedVariety,
        cropType: params.cropType,
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
