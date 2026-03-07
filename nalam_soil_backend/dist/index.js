"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "1mb" }));
app.use("/api", router_1.default);
app.get('/', (_req, res) => res.send('Nalam soil backend is running'));
const start = async () => {
    await (0, database_1.initDatabase)();
    const PORT = Number(process.env.PORT ?? 4000);
    app.listen(PORT, () => {
        console.log(`Backend listening on http://localhost:${PORT}`);
    });
};
start().catch((error) => {
    console.error("server-start-error", error);
    process.exit(1);
});
