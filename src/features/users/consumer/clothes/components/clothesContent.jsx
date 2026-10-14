import ProductCard from '../../../../../components/ui/cards/ProductCard'
import EmptyClothes from './emptyClothes'

export default function ClothesContent({ products, onClear }) {
  if (!products.length) return <EmptyClothes onClear={onClear} />

  return (
    <section aria-label="Productos del catálogo" className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} compact />)}
    </section>
  )
}
