export type FieldErrors = { title?: string; description?: string; image?: string }

export function validateRecipe(title: string, description: string, image?: File): FieldErrors {
  const errors: FieldErrors = {}
  if (!title.trim()) errors.title = 'Введите название рецепта'
  else if (title.trim().length > 100) errors.title = 'Название не должно превышать 100 символов'
  if (!description.trim()) errors.description = 'Введите описание рецепта'
  if (image && !['image/jpeg', 'image/png'].includes(image.type)) errors.image = 'Выберите изображение JPG или PNG'
  else if (image && image.size > 10 * 1024 * 1024) errors.image = 'Размер изображения не должен превышать 10 МБ'
  return errors
}

