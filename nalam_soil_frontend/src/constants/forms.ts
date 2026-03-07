import type { RegistrationFormData, LoginFormData } from '../types/forms'

export const defaultRegistrationForm: RegistrationFormData = {
  name: '',
  mobileNumber: '',
  password: '',
  village: '',
  district: '',
  landValue: '',
  landUnit: 'hectare',
  cropCategories: '',
}

export const defaultLoginForm: LoginFormData = {
  mobileNumber: '',
  password: '',
}
