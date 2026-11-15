import { recipeApiBase } from '../recipe/api'
import type { RecipeData } from '../recipe/model/Recipe'

export async function updateRecipe(token: string, id: string, title: string, description: string, image?: File): Promise<RecipeData> {
  const body = new FormData()
  body.append('title', title.trim())
  body.append('description', description.trim())
  if (image) body.append('image', image)
  const response = await fetch(`${recipeApiBase}/api/v1/recipes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
  if (!response.ok) {
    const messages: Record<number, string> = {
      400: 'Проверьте заполненные поля и изображение',
      401: 'Сессия истекла. Войдите снова',
      403: 'Недостаточно прав для редактирования рецепта',
      404: 'Рецепт не найден',
      409: 'Рецепт с таким названием уже существует',
      413: 'Размер изображения не должен превышать 10 МБ',
    }
    throw new Error(messages[response.status] ?? 'Не удалось сохранить рецепт. Попробуйте ещё раз')
  }
  return response.json()
}
