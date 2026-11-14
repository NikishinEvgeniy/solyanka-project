export type Recipe = {
  id: number
  title: string
  description: string
  image_url?: string | null
  created_at?: string
  updated_at?: string
}

export type FieldErrors = { title?: string; description?: string; image?: string }

export function validateRecipe(title: string, description: string): FieldErrors {
  const errors: FieldErrors = {}
  if (!title.trim()) errors.title = 'Введите название рецепта'
  else if (title.length > 100) errors.title = 'Название не должно превышать 100 символов'
  if (!description.trim()) errors.description = 'Введите описание рецепта'
  return errors
}

export class RecipeApiError extends Error {
  status: number
  constructor(status: number) {
    super(`Recipe API: ${status}`)
    this.status = status
  }
}

// Same-origin /api in production; override for a separately hosted backend.
const endpoint = `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/v1/recipes`

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
