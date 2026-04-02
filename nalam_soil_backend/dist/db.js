"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserByMobile = getUserByMobile;
exports.getUserById = getUserById;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
const dbFile = path_1.default.resolve(process.cwd(), "nalam_soil.db");
const db = new better_sqlite3_1.default(dbFile);
// Initial schema migration
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    mobileNumber TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    village TEXT NOT NULL,
    district TEXT NOT NULL,
    landholding REAL NOT NULL,
    unit TEXT NOT NULL,
    cropCategories TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);
function createUser(user) {
    const stmt = db.prepare(`
    INSERT INTO users (name, mobileNumber, password, village, district, landholding, unit, cropCategories) 
    VALUES (@name, @mobileNumber, @password, @village, @district, @landholding, @unit, @cropCategories)
  `);
    const info = stmt.run({
        ...user,
        cropCategories: typeof user.cropCategories === "string"
            ? user.cropCategories
            : JSON.stringify(user.cropCategories),
    });
    return { id: info.lastInsertRowid };
}
function getUserByMobile(mobileNumber) {
    const stmt = db.prepare("SELECT * FROM users WHERE mobileNumber = ?");
    return stmt.get(mobileNumber);
}
function getUserById(id) {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id);
}
