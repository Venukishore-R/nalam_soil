import { CropType, UnitType } from "./types";

export const CROPS: CropType[] = [
  "Sorghum",
  "Sugarcane",
  "Paddy",
  "Radish",
  "Tapioca",
];

export const SOIL_TYPES: Record<CropType, string[] | null> = {
  Sugarcane: ["Mixed Black Calcareous", "Red Coastal Olivia", "Red Sanalone"],
  Sorghum: ["Mixed Black Calcareous", "Red Sandstone"],
  Paddy: null,
  Radish: null,
  Tapioca: null,
};

export const VARIETIES: Record<CropType, string[] | null> = {
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

export const DAYS_AFTER_PLANTING: Record<CropType, number[] | null> = {
  Paddy: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150],
  Radish: [20, 40, 60, 80],
  Tapioca: [30, 60, 90, 120, 150, 180, 210, 240, 270, 300],
  Sugarcane: null,
  Sorghum: null,
};

export const UNITS = ["hectare", "acre", "square_meter"] as const;

export const UNIT_LABELS: Record<string, string> = {
  hectare: "Hectare (ha)",
  acre: "Acre",
  square_meter: "Square Meter (m²)",
};

export const CROP_GROWTH_STAGES: Record<CropType, string[]> = {
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
export const UNIT_CONVERSION = {
  hectare_to_acre: 2.471,
  acre_to_hectare: 0.4047,
  square_meter_to_acre: 0.000247,
  hectare_to_square_meter: 10000,
  acre_to_square_meter: 4047,
  square_meter_to_hectare: 0.0001,
} as const;

// Convert any unit to acres
export function convertToAcres(value: number, unit: string): number {
  switch (unit) {
    case "hectare":
      return value * UNIT_CONVERSION.hectare_to_acre;
    case "acre":
      return value;
    case "square_meter":
      return value * UNIT_CONVERSION.square_meter_to_acre;
    default:
      return value;
  }
}

const PER_ACRE_TO_UNIT_MULTIPLIER: Record<UnitType, number> = {
  acre: 1,
  hectare: UNIT_CONVERSION.hectare_to_acre,
  square_meter: 1 / UNIT_CONVERSION.acre_to_square_meter,
};

export function convertPerHectareToPerAcre(value: number): number {
  return value * UNIT_CONVERSION.acre_to_hectare;
}

export function convertPerAcreToUnit(value: number, unit: UnitType): number {
  return value * PER_ACRE_TO_UNIT_MULTIPLIER[unit];
}
