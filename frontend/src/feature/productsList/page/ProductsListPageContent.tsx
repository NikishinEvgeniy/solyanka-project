import { useEffect, useState, useMemo } from 'react'
import { useProducts } from '../hooks/useProducts' // Укажите правильный путь
import { ProductsList } from '../card/ProductsList'
import type { Product } from '../model/Product'

const PAGE_SIZE = 4

type Props = {
  onSelect: (product: Product) => void
  onClose: () => void
}

export function ProductsListPageContent({ onSelect, onClose }: Props) {
  const { data: allProducts, isLoading, isError } = useProducts()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Сбрасываем страницу при изменении поиска
  useEffect(() => {
    setPage(1)
  }, [search])

  // Клиентская фильтрация и пагинация
  const { currentProducts, totalPages } = useMemo(() => {
    const filtered = allProducts?.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    ) ?? []

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
    const start = (page - 1) * PAGE_SIZE
    const currentProducts = filtered.slice(start, start + PAGE_SIZE)

    return { currentProducts, totalPages }
  }, [allProducts, search, page])

  const handleSelect = (product: Product) => {
    setSelectedProduct(product)
    onSelect(product)
  }

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
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Список продуктов */}
      <div className="modal-body">
        {isLoading && <div className="loading-text">Загрузка...</div>}
        {isError && <div className="error-text">Ошибка загрузки</div>}

        {!isLoading && !isError && currentProducts.length === 0 && (
          <div className="empty-text">Ничего не найдено</div>
        )}

        {!isLoading && !isError && currentProducts.length > 0 && (
          <ProductsList
            products={currentProducts}
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