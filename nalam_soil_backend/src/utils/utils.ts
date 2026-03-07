import { Response } from "express";

type ResponseBody = {
  data: unknown;
  message: string;
  error: string | string[] | null;
  status: boolean;
};

export const handleResponse = (
  res: Response,
  httpStatus: number,
  payload: Partial<ResponseBody> = {},
) => {
  const response: ResponseBody = {
    data: payload.data ?? null,
    message: payload.message ?? "",
    error: payload.error ?? null,
    status: payload.status ?? (httpStatus >= 200 && httpStatus < 300),
  };
  return res.status(httpStatus).json(response);
};

import type { RegistrationPayload } from "../models/types";
import { ALLOWED_UNITS } from "../models/farmer";

export const validateRegistrationPayload = (
  body: Partial<RegistrationPayload>,
) => {
  const errors: string[] = [];
  if (!body.name?.trim()) {
    errors.push("name is required");
  }
  if (!body.mobileNumber) {
    errors.push("mobile number is required");
  } else if (!/^\d{7,15}$/.test(body.mobileNumber)) {
    errors.push("mobile number must be 7-15 digits");
  }
  if (!body.password || body.password.length < 6) {
    errors.push("password must be at least 6 characters");
  }
  if (!body.village?.trim()) {
    errors.push("village is required");
  }
  if (!body.district?.trim()) {
    errors.push("district is required");
  }

  const holdings = body.landHoldings;
  const value = Number(holdings?.value);
  if (!holdings || Number.isNaN(value)) {
    errors.push("landHoldings.value must be a number");
  } else if (!holdings.unit || !ALLOWED_UNITS.includes(holdings.unit)) {
    errors.push(`landHoldings.unit must be one of ${ALLOWED_UNITS.join(", ")}`);
  }

  if (
    !Array.isArray(body.cropCategories) ||
    body.cropCategories.some(
      (entry) => typeof entry !== "string" || !entry.trim(),
    )
  ) {
    errors.push("cropCategories must be an array of non-empty strings");
  }

  return errors;
};

export const sanitizeRegistrationPayload = (
  payload: RegistrationPayload,
): RegistrationPayload => ({
  ...payload,
  name: payload.name.trim(),
  village: payload.village.trim(),
  district: payload.district.trim(),
  cropCategories: payload.cropCategories.map((cat) => cat.trim()),
});
