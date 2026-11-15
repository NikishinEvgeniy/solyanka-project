// recipesList/api/RecipesListApi.ts

export type Recipe = {
  id: string
  title: string
  description: string
  imageUrl?: string
  authorId: string
  createdAt: string
  updatedAt: string
}

export type RecipesPageResponse = {
  items: Recipe[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

type FetchRecipesParams = {
  page: number
  pageSize: number
}

export async function fetchRecipes({
  page,
  pageSize,
}: FetchRecipesParams): Promise<RecipesPageResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const total = 18
  const totalPages = Math.ceil(total / pageSize)

  const items: Recipe[] = Array.from({ length: pageSize }, (_, i) => {
    const itemId = (page - 1) * pageSize + i + 1
    if (itemId > total) return null
    return {
      id: String(itemId),
      title: `Рецепт №${itemId}`,
      description: 'Описание рецепта',
      authorId: 'uuid-author',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imageUrl: undefined,
    }
  }).filter(Boolean) as Recipe[]

  //throw new Error('500: Internal Server Error')
  return { items, page, pageSize, total, totalPages }
}