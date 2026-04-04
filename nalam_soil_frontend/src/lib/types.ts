export type CropType = "Sorghum" | "Sugarcane" | "Paddy" | "Radish" | "Tapioca";
export type UnitType = "hectare" | "acre" | "square_meter";

export interface User {
  id: string;
  name: string;
  mobileNumber: string;
  village: string;
  district: string;
  landholding: number;
  unit: UnitType;
  cropCategories: CropType[];
}

export interface SoilTestData {
  id: string;
  userId: string;
  cropName: CropType;
  soilType: string;
  variety?: string;
  dayAfterPlanting?: number;
  landholdingOfCrop: number;
  unit: UnitType;
  nitrogen: number;
  phosphorous: number;
  potassium: number;
  createdAt: Date;
  finalRecommendation?: FinalRecommendation;
}

export interface NutrientRecommendationBlock {
  value: number;
  unit: string;
}

export interface FertilizerRecommendationLine {
  label: string;
  perUnitValue: number;
  perUnitLabel: string;
  totalValue: number;
  totalUnit: string;
}

export interface FinalRecommendation {
  unit: UnitType;
  landholding: number;
  landholdingInAcres: number;
  soilType: string | null;
  soilKey: string;
  cropType: CropType;
  perUserUnit: {
    urea: NutrientRecommendationBlock;
    ssp: NutrientRecommendationBlock;
    mop: NutrientRecommendationBlock;
  };
  totals: {
    urea: NutrientRecommendationBlock;
    ssp: NutrientRecommendationBlock;
    mop: NutrientRecommendationBlock;
  };
  baseFertilizers: FertilizerRecommendationLine[];
}

export interface SoilTestData {
  id: string;
  userId: string;
  cropName: CropType;
  soilType: string;
  variety?: string;
  dayAfterPlanting?: number;
  landholdingOfCrop: number;
  unit: UnitType;
  nitrogen: number;
  phosphorous: number;
  potassium: number;
  createdAt: Date;
  finalRecommendation?: FinalRecommendation;
}

export interface SoilTypeOption {
  crop: CropType;
  types: string[];
}

export interface VarietyOption {
  crop: CropType;
  varieties: string[];
}

export interface DayAfterPlantingOption {
  crop: CropType;
  days: number[];
}
