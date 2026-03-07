"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAppSecret = void 0;
const utils_1 = require("../utils/utils");
const SECRET = process.env.APP_SECRET ?? "open-sesame";
const requireAppSecret = (req, res, next) => {
    const provided = req.header("x-app-secret");
    if (provided !== SECRET) {
        return (0, utils_1.handleResponse)(res, 401, {
            message: "missing or invalid X-App-Secret header",
            error: "missing or invalid X-App-Secret header",
            status: false,
        });
    }
    return next();
};
exports.requireAppSecret = requireAppSecret;
