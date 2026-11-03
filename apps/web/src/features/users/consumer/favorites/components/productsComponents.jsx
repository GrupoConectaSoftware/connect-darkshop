import ProductCard from '../../../../../components/ui/cards/ProductCard'

export default function ProductsComponents({ products }) {
  return (
    <section aria-label="Productos favoritos" className="grid grid-cols-1 justify-items-center gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => <ProductCard key={`${product.id ?? product.slug ?? product.name}`} product={product} />)}
    </section>
  )
}
