"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFarmer = exports.RegisterFarmer = void 0;
const services = __importStar(require("../services"));
const utils_1 = require("../utils/utils");
const RegisterFarmer = async (req, res) => {
    try {
        const payload = req.body;
        const result = await services.RegisterFarmer(payload);
        return (0, utils_1.handleResponse)(res, result.httpStatus, {
            data: result.data,
            message: result.message,
            error: result.error,
            status: result.status,
        });
    }
    catch (error) {
        console.error("registration error", error);
        return (0, utils_1.handleResponse)(res, 500, {
            data: null,
            message: "internal server error",
            error: "internal server error",
            status: false,
        });
    }
};
exports.RegisterFarmer = RegisterFarmer;
const LoginFarmer = async (req, res) => {
    try {
        const payload = req.body;
        const result = await services.LoginFarmer(payload);
        return (0, utils_1.handleResponse)(res, result.httpStatus, {
            data: result.data,
            message: result.message,
            error: result.error,
            status: result.status,
        });
    }
    catch (error) {
        console.error("login error", error);
        return (0, utils_1.handleResponse)(res, 500, {
            data: null,
            message: "internal server error",
            error: "internal server error",
            status: false,
        });
    }
};
exports.LoginFarmer = LoginFarmer;
