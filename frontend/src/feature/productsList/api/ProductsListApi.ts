import type { Product } from '../model/Product'

export type ProductsPageResponse = {
  items: Product[]
  page: number
  pageSize: number
  total: number
  totalPages: number
  last: boolean
}

type FetchProductsParams = {
  page: number
  pageSize: number
  search?: string
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Говядина' },
  { id: '2', title: 'Фарш' },
  { id: '3', title: 'Яблоко' },
  { id: '4', title: 'Молоко' },
  { id: '5', title: 'Куриное филе' },
  { id: '6', title: 'Картофель' },
  { id: '7', title: 'Помидор' },
  { id: '8', title: 'Сыр' },
]

export async function fetchProducts({
  page,
  pageSize,
  search = '',
}: FetchProductsParams): Promise<ProductsPageResponse> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Фильтрация по поиску (для демонстрации)
  let filtered = MOCK_PRODUCTS
  if (search.trim()) {
    filtered = MOCK_PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const start = (page - 1) * pageSize
  const items = filtered.slice(start, start + pageSize)

  return {
    items,
    page,
    pageSize,
    total,
    totalPages,
    last: page >= totalPages,
  }
}