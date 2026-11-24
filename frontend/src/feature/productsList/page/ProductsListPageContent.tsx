import { useRef, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { ProductsList } from '../card/ProductsList'
import type { Product } from '../model/Product'

type Props = {
  onSelect: (product: Product) => void
  onClose: () => void
  selectedId?: number
}

export function ProductsListPageContent({ onSelect, onClose, selectedId: initialSelectedId }: Props) {
  const { data: allProducts, isLoading, isError } = useProducts()

  const listRef = useRef<HTMLDivElement>(null)
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const selectedId = selectedProduct?.id ?? initialSelectedId

  const query = search.trim().toLowerCase()
  const filteredProducts = allProducts?.filter(product => product.title.toLowerCase().includes(query)) ?? []

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
          onChange={event => {
            setSearch(event.target.value)
            if (listRef.current) listRef.current.scrollTop = 0
          }}
          className="search-input"
          aria-label="Поиск продукта"
          autoFocus
        />
      </div>

      {/* Список продуктов */}
      <div className="modal-body" ref={listRef}>
        {isLoading && <div className="loading-text">Загрузка...</div>}
        {isError && <div className="error-text">Ошибка загрузки</div>}

        {!isLoading && !isError && filteredProducts.length === 0 && (
          <div className="empty-text">Ничего не найдено</div>
        )}

        {!isLoading && !isError && filteredProducts.length > 0 && (
          <ProductsList
            products={filteredProducts}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        )}
      </div>
    </div>
  )
}
