"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFarmer = exports.RegisterFarmer = void 0;
const farmer_1 = require("../models/farmer");
const utils_1 = require("../utils/utils");
const database_1 = require("../config/database");
const mapPrismaFarmer = (record) => ({
    id: record.ID,
    name: record.NAME,
    mobileNumber: record.MOBILENUMBER,
    passwordHash: record.PASSWORDHASH,
    village: record.VILLAGE,
    district: record.DISTRICT,
    registeredAt: record.REGISTEREDAT.toISOString(),
    cropCategories: JSON.parse(record.CROPCATEGORIES),
    landHoldings: {
        value: record.LANDVALUE,
        unit: String(record.LANDUNIT),
    },
});
const RegisterFarmer = async (payload) => {
    const errors = (0, utils_1.validateRegistrationPayload)(payload);
    if (errors.length) {
        return {
            status: false,
            message: "Invalid registration payload",
            data: null,
            error: errors,
            httpStatus: 400,
        };
    }
    const prisma = (0, database_1.getPrisma)();
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
    const sanitized = (0, utils_1.sanitizeRegistrationPayload)(payload);
    const createdRecord = await prisma.farmer.create({
        data: {
            NAME: sanitized.name,
            MOBILENUMBER: sanitized.mobileNumber,
            PASSWORDHASH: (0, farmer_1.hashPassword)(sanitized.password),
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
exports.RegisterFarmer = RegisterFarmer;
const LoginFarmer = async (payload) => {
    if (!payload.mobileNumber || !payload.password) {
        return {
            status: false,
            message: "Missing mobile or password",
            data: null,
            error: ["mobile number and password are required"],
            httpStatus: 400,
        };
    }
    const prisma = (0, database_1.getPrisma)();
    const userRecord = await prisma.farmer.findUnique({
        where: {
            MOBILENUMBER: payload.mobileNumber,
        },
    });
    const user = userRecord ? mapPrismaFarmer(userRecord) : null;
    if (!user || user.passwordHash !== (0, farmer_1.hashPassword)(payload.password)) {
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
exports.LoginFarmer = LoginFarmer;
