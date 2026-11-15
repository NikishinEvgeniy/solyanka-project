import type { Product } from '../model/Product'

type ProductCardProps = {
  product: Product
  isSelected: boolean
  onSelect: (product: Product) => void
}

export function ProductCard({ product, isSelected, onSelect }: ProductCardProps) {
  return (
    <label className={`product-option ${isSelected ? 'is-selected' : ''}`}>
      <input
        type="radio"
        name="product-selection"
        checked={isSelected}
        onChange={() => onSelect(product)}
        className="product-radio-input"
      />
      <span className="product-radio-custom"></span>
      <span className="product-title">{product.title}</span>
    </label>
  )
}