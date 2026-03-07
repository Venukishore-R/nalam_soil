"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.ALLOWED_UNITS = void 0;
const crypto_1 = __importDefault(require("crypto"));
exports.ALLOWED_UNITS = ['hectare', 'acre', 'meter_square'];
const hashPassword = (password) => crypto_1.default.createHash('sha256').update(password).digest('hex');
exports.hashPassword = hashPassword;
