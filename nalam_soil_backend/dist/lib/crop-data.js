"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNIT_CONVERSION = exports.CROP_GROWTH_STAGES = exports.UNIT_LABELS = exports.UNITS = exports.DAYS_AFTER_PLANTING = exports.VARIETIES = exports.SOIL_TYPES = exports.CROPS = void 0;
exports.convertToAcres = convertToAcres;
exports.convertPerHectareToPerAcre = convertPerHectareToPerAcre;
exports.convertPerAcreToUnit = convertPerAcreToUnit;
exports.CROPS = [
    "Sorghum",
    "Sugarcane",
    "Paddy",
    "Radish",
    "Tapioca",
];
exports.SOIL_TYPES = {
    Sugarcane: ["Mixed Black Calcareous", "Red Coastal Olivia", "Red Sanalone"],
    Sorghum: ["Mixed Black Calcareous", "Red Sandstone"],
    Paddy: null,
    Radish: null,
    Tapioca: null,
};
exports.VARIETIES = {
    Sorghum: ["Hybrid", "Varieties"],
    Paddy: [
        "Short duration varieties [day season]",
        "Cauvery delta & Coimbatore tract",
        "For other tract",
        "Medium & long duration varieties [wet season]",
        "Ponni",
    ],
    Sugarcane: null,
    Radish: null,
    Tapioca: null,
};
exports.DAYS_AFTER_PLANTING = {
    Paddy: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150],
    Radish: [20, 40, 60, 80],
    Tapioca: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
    Sugarcane: null,
    Sorghum: null,
};
exports.UNITS = ["hectare", "acre", "square_meter"];
exports.UNIT_LABELS = {
    hectare: "Hectare (ha)",
    acre: "Acre",
    square_meter: "Square Meter (m²)",
};
exports.CROP_GROWTH_STAGES = {
    Paddy: ["Basal", "Tillering", "Panicle initiation", "Heading stage"],
    Radish: [
        "Basal",
        "Vegetative stage",
        "Early root development",
        "Root maturity",
    ],
    Tapioca: [
        "Basal",
        "Crop Establishment",
        "Vegetative stage",
        "Tubers formation",
        "Tuber development",
    ],
    Sorghum: [
        "Basal",
        "Vegetative growth",
        "Boot stage",
        "Heading",
        "Milk stage",
        "Dough stage",
    ],
    Sugarcane: ["Sprouting", "Early growth", "Grand growth period", "Maturation"],
};
// Unit conversion constants
exports.UNIT_CONVERSION = {
    hectare_to_acre: 2.471,
    acre_to_hectare: 0.4047,
    square_meter_to_acre: 0.000247,
    hectare_to_square_meter: 10000,
    acre_to_square_meter: 4047,
    square_meter_to_hectare: 0.0001,
};
// Convert any unit to acres
function convertToAcres(value, unit) {
    switch (unit) {
        case "hectare":
            return value * exports.UNIT_CONVERSION.hectare_to_acre;
        case "acre":
            return value;
        case "square_meter":
            return value * exports.UNIT_CONVERSION.square_meter_to_acre;
        default:
            return value;
    }
}
const PER_ACRE_TO_UNIT_MULTIPLIER = {
    acre: 1,
    hectare: exports.UNIT_CONVERSION.hectare_to_acre,
    square_meter: 1 / exports.UNIT_CONVERSION.acre_to_square_meter,
};
function convertPerHectareToPerAcre(value) {
    return value * exports.UNIT_CONVERSION.acre_to_hectare;
}
function convertPerAcreToUnit(value, unit) {
    return value * PER_ACRE_TO_UNIT_MULTIPLIER[unit];
}
