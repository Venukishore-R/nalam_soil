export const splitCropCategories = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
