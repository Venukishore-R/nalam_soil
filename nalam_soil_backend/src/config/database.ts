import fs from 'fs/promises'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const DATA_DIR = path.join(process.cwd(), 'data')
const DEFAULT_DB_URL = `file:${path.join(DATA_DIR, 'farmers.db')}`

let prisma: PrismaClient | null = null

export const initDatabase = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true })
  if (!prisma) {
    const databaseUrl = process.env.DATABASE_URL ?? DEFAULT_DB_URL
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    })
    await prisma.$connect()
  }
  return prisma
}

export const getPrisma = () => {
  if (!prisma) {
    throw new Error('Database has not been initialized')
  }
  return prisma
}
