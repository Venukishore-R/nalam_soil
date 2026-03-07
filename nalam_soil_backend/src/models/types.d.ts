export type LandUnit = 'hectare' | 'acre' | 'meter_square'

export interface LandHolding {
  value: number
  unit: LandUnit
}

export interface RegistrationPayload {
  name: string
  mobileNumber: string
  password: string
  village: string
  district: string
  landHoldings: LandHolding
  cropCategories: string[]
}

export interface LoginPayload {
  mobileNumber: string
  password: string
}

export interface FarmerRecord {
  id: string
  name: string
  mobileNumber: string
  passwordHash: string
  village: string
  district: string
  landHoldings: LandHolding
  cropCategories: string[]
  registeredAt: string
}
