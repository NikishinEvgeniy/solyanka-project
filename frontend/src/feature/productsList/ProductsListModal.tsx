import { ProductsListPageContent } from './page/ProductsListPageContent'
import type { Product } from './model/Product'
import './ProductsListModal.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSelect: (product: Product) => void
}

export const ProductsListModal = ({ isOpen, onClose, onSelect }: Props) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <ProductsListPageContent onSelect={onSelect} onClose={onClose} />
      </div>
    </div>
  )
}
export default ProductsListModal