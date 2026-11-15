import { useEffect, useState } from 'react'
import { fetchProducts, type ProductsPageResponse } from '../api/ProductsListApi'
import { ProductsList } from '../card/ProductsList'
import type { Product } from '../model/Product'

const PAGE_SIZE = 4

type Props = {
  onSelect: (product: Product) => void
  onClose: () => void
}

export function ProductsListPageContent({ onSelect, onClose }: Props) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [data, setData] = useState<ProductsPageResponse | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    fetchProducts({ page, pageSize: PAGE_SIZE, search })
      .then((res) => {
        if (cancelled) return
        setData(res)
        setStatus('idle')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [page, search])

  const handleSelect = (product: Product) => {
    setSelectedProduct(product)
    onSelect(product)
  }

  const products = data?.items ?? []
  const totalPages = data?.totalPages ?? 1

  return (
    <div className="product-modal-content">
      {/* Шапка с заголовком и крестиком */}
      <div className="modal-header">
        <h2 className="modal-title">Выберите продукт</h2>
        <button type="button" onClick={onClose} className="close-modal-btn" aria-label="Закрыть">
          ✕
        </button>
      </div>

      {/* Строка поиска */}
      <div className="modal-search">
        <input
          type="text"
          placeholder="Введите название продукта..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1) // сбрасываем на 1-ю страницу при поиске
          }}
          className="search-input"
        />
      </div>

      {/* Список продуктов */}
      <div className="modal-body">
        {status === 'loading' && !data && <div className="loading-text">Загрузка...</div>}
        {status === 'error' && <div className="error-text">Ошибка загрузки</div>}
        {status === 'idle' && products.length === 0 && (
          <div className="empty-text">Ничего не найдено</div>
        )}

        {status === 'idle' && products.length > 0 && (
          <ProductsList
            products={products}
            selectedId={selectedProduct?.id}
            onSelect={handleSelect}
          />
        )}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <nav className="modal-pagination" aria-label="Навигация по страницам">
          {buildPageList(page, totalPages).map((item, idx) =>
            item === '…' ? (
              <span key={`e-${idx}`} className="pagination-ellipsis">…</span>
            ) : (
              <button
                key={item}
                type="button"
                className={`pagination-item${item === page ? ' is-active' : ''}`}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ),
          )}
        </nav>
      )}
    </div>
  )
}

function buildPageList(current: number, total: number): Array<number | '…'> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: Array<number | '…'> = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push('…')
    result.push(sorted[i])
  }
  return result
}