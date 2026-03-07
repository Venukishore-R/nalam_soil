"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeRegistrationPayload = exports.validateRegistrationPayload = exports.handleResponse = void 0;
const handleResponse = (res, httpStatus, payload = {}) => {
    const response = {
        data: payload.data ?? null,
        message: payload.message ?? "",
        error: payload.error ?? null,
        status: payload.status ?? (httpStatus >= 200 && httpStatus < 300),
    };
    return res.status(httpStatus).json(response);
};
exports.handleResponse = handleResponse;
const farmer_1 = require("../models/farmer");
const validateRegistrationPayload = (body) => {
    const errors = [];
    if (!body.name?.trim()) {
        errors.push("name is required");
    }
    if (!body.mobileNumber) {
        errors.push("mobile number is required");
    }
    else if (!/^\d{7,15}$/.test(body.mobileNumber)) {
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
    }
    else if (!holdings.unit || !farmer_1.ALLOWED_UNITS.includes(holdings.unit)) {
        errors.push(`landHoldings.unit must be one of ${farmer_1.ALLOWED_UNITS.join(", ")}`);
    }
    if (!Array.isArray(body.cropCategories) ||
        body.cropCategories.some((entry) => typeof entry !== "string" || !entry.trim())) {
        errors.push("cropCategories must be an array of non-empty strings");
    }
    return errors;
};
exports.validateRegistrationPayload = validateRegistrationPayload;
const sanitizeRegistrationPayload = (payload) => ({
    ...payload,
    name: payload.name.trim(),
    village: payload.village.trim(),
    district: payload.district.trim(),
    cropCategories: payload.cropCategories.map((cat) => cat.trim()),
});
exports.sanitizeRegistrationPayload = sanitizeRegistrationPayload;
