import { recipeApiBase } from '../../library/api/recipeApiBase'

export type Recipe = {
  id: number
  title: string
  description: string
  image_url?: string | null
  created_at?: string
  updated_at?: string
}

export class RecipeApiError extends Error {
  status: number
  constructor(status: number) {
    const messages: Record<number, string> = {
      400: 'Проверьте заполненные поля и изображение',
      401: 'Сессия истекла. Войдите снова',
      403: 'Недостаточно прав для создания рецепта',
      409: 'Рецепт с таким названием уже существует',
      413: 'Размер изображения не должен превышать 10 МБ',
    }
    super(messages[status] ?? 'Не удалось сохранить рецепт. Попробуйте ещё раз')
    this.status = status
  }
}

const endpoint = `${recipeApiBase}/api/v1/recipes`

export async function recipeRequest(token: string, path = '', init?: RequestInit) {
  const response = await fetch(`${endpoint}${path}`, {
    ...init,
    headers: { ...init?.headers, Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new RecipeApiError(response.status)
  return response.json()
}

export async function saveRecipe(token: string, title: string, description: string, image?: File) {
  const body = new FormData()
  body.append('title', title.trim())
  body.append('description', description.trim())
  if (image) body.append('image', image)
  return recipeRequest(token, '', { method: 'POST', body }) as Promise<Recipe>
}
