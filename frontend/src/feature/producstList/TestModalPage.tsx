// feature/producstList/TestModalPage.tsx
import { useState } from 'react'
import ProductsListModal from './ProductsListModal'
import type { Product } from './model/Product'

export default function TestModalPage() {
  const [isOpen, setIsOpen] = useState(false)
  // Храним только один продукт — последний выбранный
  const [lastSelected, setLastSelected] = useState<Product | null>(null)

  const handleSelect = (product: Product) => {
    // Просто перезаписываем состояние последним выбранным продуктом
    setLastSelected(product)

    // Если по дизайну модалка должна закрываться при клике на продукт,
    // раскомментируйте строку ниже:
    // setIsOpen(false)
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Тест модального окна</h1>

      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '12px 24px',
          background: '#493629',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Открыть каталог продуктов
      </button>

      {/* Блок вывода последнего выбранного продукта */}
      {lastSelected && (
        <div style={{
          marginTop: '30px',
          padding: '20px',
          border: '1px solid #b16244',
          borderRadius: '8px',
          backgroundColor: '#fdf6e3',
          display: 'inline-block'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#2f251f' }}>Последний выбранный:</h3>
          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#b16244' }}>
            {lastSelected.title}
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
            (ID: {lastSelected.id})
          </p>
        </div>
      )}

      <ProductsListModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  )
}