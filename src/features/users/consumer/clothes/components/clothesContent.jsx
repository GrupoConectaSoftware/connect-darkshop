import ProductCard from '../../../../../components/ui/cards/ProductCard'
import EmptyClothes from './emptyClothes'

export default function ClothesContent({ products }) {
  if (!products.length) return <EmptyClothes />

  return (
    <section aria-label="Productos del catálogo" className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(264px,1fr))] justify-items-center gap-5 sm:gap-6 xl:grid-cols-3">
      {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </section>
  )
}
