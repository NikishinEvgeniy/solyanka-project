// feature/productsList/api/ProductsListApi.ts

export type Product = {
  id: string
  title: string
  description?: string
  imageUrl?: string
  authorId?: string
  createdAt?: string
  updatedAt?: string
}

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
}

const API_BASE = 'http://localhost:8000'

function getAuthToken(): string | null {
  return localStorage.getItem('token')
}

type ServerProduct = {
  id: string | number
  title: string
  img_url?: string | null
}

type ServerResponse = {
  recipes: ServerProduct[]
  page: number
  size: number
  totalElements: number
  last: boolean
}

export async function fetchProducts({
  page,
  pageSize,
}: FetchProductsParams): Promise<ProductsPageResponse> {
  const token = getAuthToken()

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const params = new URLSearchParams({
    page: String(page),
    size: String(pageSize),
  })

  const response = await fetch(`${API_BASE}/recipes?${params.toString()}`, {
    method: 'GET',
    headers,
  })

  if (response.status === 401 || response.status === 403) {
    throw new Error('UNAUTHORIZED')
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const raw = (await response.json()) as ServerResponse

  const items: Product[] = (raw.recipes ?? []).map((r) => ({
    id: String(r.id),
    title: r.title,
    imageUrl: r.img_url ?? undefined,
  }))

  return {
    items,
    page: raw.page,
    pageSize: raw.size,
    total: raw.totalElements,
    totalPages:
      raw.size > 0 ? Math.max(1, Math.ceil(raw.totalElements / raw.size)) : 1,
    last: raw.last,
  }
}