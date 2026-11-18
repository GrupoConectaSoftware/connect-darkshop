import ProductCard from '../../../../../components/ui/cards/ProductCard'
import ProductSkeleton from '../../../../../components/ui/cards/ProductSkeleton'
import EmptyClothes from './emptyClothes'

export default function ClothesContent({ products, onClear, isLoading = false }) {
  if (isLoading) return <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{Array.from({ length: 8 }, (_, i) => <ProductSkeleton key={i} />)}</section>
  if (!products.length) return <EmptyClothes onClear={onClear} />

  return (
    <section aria-label="Productos del catálogo" className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => <ProductCard key={product.id} product={product} compact />)}
    </section>
  )
}
