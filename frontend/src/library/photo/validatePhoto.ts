export function validatePhoto(file: File): string | undefined {
  if (!['image/jpeg', 'image/png'].includes(file.type)) return 'Выберите изображение JPG или PNG'
  if (file.size > 10 * 1024 * 1024) return 'Размер изображения не должен превышать 10 МБ'
}
