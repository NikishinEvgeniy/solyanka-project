import { recipeApiBase } from '../../library/api/recipeApiBase'
import type { RecipeData } from '../recipe/model/Recipe'

export class RecipeEditError extends Error {
  status: number
  constructor(status: number) {
    const messages: Record<number, string> = {
      400: 'Проверьте заполненные поля',
      401: 'Сессия истекла. Войдите снова',
      403: 'Недостаточно прав для редактирования рецепта',
      404: 'Рецепт не найден. Возможно, он был удалён',
      409: 'Рецепт с таким названием уже существует',
    }
    super(messages[status] ?? 'Не удалось сохранить рецепт. Попробуйте ещё раз')
    this.status = status
  }
}

export type IngredientPayload = { product_id: number; amount: number; unit: string }

export async function editRecipe(
  token: string,
  id: string,
  title: string,
  description: string,
  ingredients?: IngredientPayload[],
): Promise<RecipeData> {
  const body = new FormData()
  body.append('title', title.trim())
  body.append('description', description.trim())
  if (ingredients) body.append('ingredients', JSON.stringify(ingredients))
  const response = await fetch(`${recipeApiBase}/api/v1/recipes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body,
  })
  if (!response.ok) throw new RecipeEditError(response.status)
  return response.json()
}
