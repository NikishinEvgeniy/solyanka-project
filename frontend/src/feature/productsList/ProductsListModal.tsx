import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ProductsListPageContent } from './page/ProductsListPageContent'
import type { Product } from './model/Product'
import './ProductsListModal.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect: (product: Product) => void
  /** Продукт, который нужно подсветить как уже выбранный. */
  selectedId?: number
}

export const ProductsListModal = ({ isOpen, onClose, onSelect, selectedId }: Props) => {
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Портал нужен, чтобы стили страницы (например, .recipe-edit button) не влияли на окно
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Выбор продукта"
        onClick={(e) => e.stopPropagation()}
      >
        <ProductsListPageContent onSelect={onSelect} onClose={onClose} selectedId={selectedId} />
      </div>
    </div>,
    document.body,
  )
}
export default ProductsListModal
