import { hashPassword } from "../models/farmer";
import type {
  FarmerRecord,
  LandUnit,
  LoginPayload,
  RegistrationPayload,
} from "../models/types";
import {
  sanitizeRegistrationPayload,
  validateRegistrationPayload,
} from "../utils/utils";
import { getPrisma } from "../config/database";
import { Farmer } from "@prisma/client";

type ServiceResult = {
  status: boolean;
  message: string;
  data: unknown;
  error: string | string[] | null;
  httpStatus: number;
};

const mapPrismaFarmer = (record: Farmer): FarmerRecord => ({
  id: record.ID,
  name: record.NAME,
  mobileNumber: record.MOBILENUMBER,
  passwordHash: record.PASSWORDHASH,
  village: record.VILLAGE,
  district: record.DISTRICT,
  registeredAt: record.REGISTEREDAT.toISOString(),
  cropCategories: JSON.parse(record.CROPCATEGORIES as string),
  landHoldings: {
    value: record.LANDVALUE,
    unit: String(record.LANDUNIT) as LandUnit,
  },
});

export const RegisterFarmer = async (payload: RegistrationPayload): Promise<ServiceResult> => {
  const errors = validateRegistrationPayload(payload);
  if (errors.length) {
    return {
      status: false,
      message: "Invalid registration payload",
      data: null,
      error: errors,
      httpStatus: 400,
    };
  }

  const prisma = getPrisma();
  const existing = await prisma.farmer.findUnique({
    where: {
      MOBILENUMBER: payload.mobileNumber,
    },
  });
  if (existing) {
    return {
      status: false,
      message: "Mobile already registered",
      data: null,
      error: ["mobile number already registered"],
      httpStatus: 409,
    };
  }

  const sanitized = sanitizeRegistrationPayload(payload);

  const createdRecord = await prisma.farmer.create({
    data: {
      NAME: sanitized.name,
      MOBILENUMBER: sanitized.mobileNumber,
      PASSWORDHASH: hashPassword(sanitized.password),
      VILLAGE: sanitized.village,
      DISTRICT: sanitized.district,
      LANDVALUE: sanitized.landHoldings.value,
      LANDUNIT: sanitized.landHoldings.unit,
      CROPCATEGORIES: JSON.stringify(sanitized.cropCategories),
      REGISTEREDAT: new Date(),
    },
  });
  const created = mapPrismaFarmer(createdRecord);
  if (!created) {
    return {
      status: false,
      message: "Unable to persist farmer",
      data: null,
      error: "failed to create farmer",
      httpStatus: 500,
    };
  }

  return {
    status: true,
    message: "Farmer registered",
    data: { farmerId: created.id },
    error: null,
    httpStatus: 201,
  };
};

export const LoginFarmer = async (payload: LoginPayload): Promise<ServiceResult> => {
  if (!payload.mobileNumber || !payload.password) {
    return {
      status: false,
      message: "Missing mobile or password",
      data: null,
      error: ["mobile number and password are required"],
      httpStatus: 400,
    };
  }

  const prisma = getPrisma();
  const userRecord = await prisma.farmer.findUnique({
    where: {
      MOBILENUMBER: payload.mobileNumber,
    },
  });
  const user = userRecord ? mapPrismaFarmer(userRecord) : null;
  if (!user || user.passwordHash !== hashPassword(payload.password)) {
    return {
      status: false,
      message: "Invalid credentials",
      data: null,
      error: ["invalid credentials"],
      httpStatus: 401,
    };
  }

  const { passwordHash, ...rest } = user;
  return {
    status: true,
    message: "Login successful",
    data: { farmer: rest },
    error: null,
    httpStatus: 200,
  };
};
