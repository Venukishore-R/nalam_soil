import request from "../utils/request";
import type { ApiResponse } from "../types/api";
import type { Farmer } from "../types/farmer";

export interface RegistrationPayload {
  name: string;
  mobileNumber: string;
  password: string;
  village: string;
  district: string;
  landHoldings: {
    value: number;
    unit: string;
  };
  cropCategories: string[];
}

export interface LoginPayload {
  mobileNumber: string;
  password: string;
}

export type RegisterResponse = ApiResponse<{ farmerId?: string }>;
export type LoginResponse = ApiResponse<{ farmer?: Farmer }>;

export const registerFarmer = (payload: RegistrationPayload) =>
  request.post<RegisterResponse>("/register", payload);

export const loginFarmer = (payload: LoginPayload) =>
  request.post<LoginResponse>("/login", payload);
