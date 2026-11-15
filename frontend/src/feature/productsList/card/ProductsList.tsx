import type { Product } from '../model/Product'
import { ProductCard } from './ProductCard'

type ProductsListProps = {
  products: Product[]
  selectedId?: number // Изменено со string на number
  onSelect: (product: Product) => void
}

export function ProductsList({ products, selectedId, onSelect }: ProductsListProps) {
  return (
    <div className="products-options-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedId === product.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}