import ProductCard from '../../../../../components/ui/cards/ProductCard'

export default function ContentSection({ products, collectionName }) {
  return (
    <section aria-label={`Productos de la colección ${collectionName}`} className="mx-auto max-w-[1600px] px-6 pb-20 lg:px-10">
      <div className="mb-8 border-t-2 border-black" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} compact alwaysShowActions badgeLabel={collectionName} priceAccent />)}
      </div>
    </section>
  )
}
