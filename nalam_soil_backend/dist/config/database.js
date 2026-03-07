"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrisma = exports.initDatabase = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const DATA_DIR = path_1.default.join(process.cwd(), 'data');
const DEFAULT_DB_URL = `file:${path_1.default.join(DATA_DIR, 'farmers.db')}`;
let prisma = null;
const initDatabase = async () => {
    await promises_1.default.mkdir(DATA_DIR, { recursive: true });
    if (!prisma) {
        const databaseUrl = process.env.DATABASE_URL ?? DEFAULT_DB_URL;
        prisma = new client_1.PrismaClient({
            datasources: {
                db: {
                    url: databaseUrl,
                },
            },
        });
        await prisma.$connect();
    }
    return prisma;
};
exports.initDatabase = initDatabase;
const getPrisma = () => {
    if (!prisma) {
        throw new Error('Database has not been initialized');
    }
    return prisma;
};
exports.getPrisma = getPrisma;
