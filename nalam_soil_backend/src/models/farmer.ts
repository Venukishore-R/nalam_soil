import crypto from 'crypto'
import type { LandUnit } from './types'

export const ALLOWED_UNITS: LandUnit[] = ['hectare', 'acre', 'meter_square']

export const hashPassword = (password: string) =>
  crypto.createHash('sha256').update(password).digest('hex')
