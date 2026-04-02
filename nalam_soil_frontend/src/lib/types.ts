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
