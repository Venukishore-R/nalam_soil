import Database from "better-sqlite3";
import path from "path";

const dbFile = path.resolve(process.cwd(), "nalam_soil.db");
const db = new Database(dbFile);

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

export interface UserRecord {
  id: number;
  name: string;
  mobileNumber: string;
  password: string;
  village: string;
  district: string;
  landholding: number;
  unit: string;
  cropCategories: string;
  createdAt: string;
}

export function createUser(user: Omit<UserRecord, "id" | "createdAt">) {
  const stmt = db.prepare(`
    INSERT INTO users (name, mobileNumber, password, village, district, landholding, unit, cropCategories) 
    VALUES (@name, @mobileNumber, @password, @village, @district, @landholding, @unit, @cropCategories)
  `);

  const info = stmt.run({
    ...user,
    cropCategories:
      typeof user.cropCategories === "string"
        ? user.cropCategories
        : JSON.stringify(user.cropCategories),
  });

  return { id: info.lastInsertRowid as number };
}

export function getUserByMobile(mobileNumber: string): UserRecord | undefined {
  const stmt = db.prepare("SELECT * FROM users WHERE mobileNumber = ?");
  return stmt.get(mobileNumber) as UserRecord | undefined;
}

export function getUserById(id: number): UserRecord | undefined {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id) as UserRecord | undefined;
}
