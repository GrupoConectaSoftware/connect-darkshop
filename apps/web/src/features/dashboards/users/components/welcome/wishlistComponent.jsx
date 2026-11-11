import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import ProductCard from '../../../../../components/ui/cards/ProductCard'

export default function WishlistComponent({ products, fallbackProducts = [] }) {
  const favorites = products.slice(-4).reverse()
  const favoriteIds = new Set(favorites.map((product) => String(product.id ?? product.slug ?? product.name)))
  const suggestions = fallbackProducts.filter((product) => !favoriteIds.has(String(product.id ?? product.slug ?? product.name)))
  const recentProducts = [...favorites, ...suggestions].slice(0, 4)

  return <section className="py-4 sm:py-6" aria-labelledby="wishlist-title">
    <div className="flex flex-wrap items-end justify-between gap-5 border-b border-neutral-200 pb-5">
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.22em] text-red-800">Tu selección</p>
        <h2 id="wishlist-title" className="font-display text-2xl font-black uppercase leading-tight text-neutral-900 sm:text-3xl">Haz realidad tu lista de deseos</h2>
        <p className="mt-2 text-sm text-neutral-500">Tus últimos productos seleccionados.{favorites.length < 4 && ' Incluye productos de ejemplo.'}</p>
      </div>
      <Link to="/favorites" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-800 transition-colors hover:text-red-600">Ver todos mis favoritos <ArrowUpRight size={15} /></Link>
    </div>
    {recentProducts.length ? <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">{recentProducts.map((product) => <div key={product.id ?? product.slug ?? product.name} className="min-w-0"><ProductCard product={product} compact iconHoverRedOnly /></div>)}</div> : <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-neutral-300 bg-white p-6"><span className="grid size-11 place-items-center rounded-full bg-neutral-100 text-red-800"><Heart size={20} /></span><div><p className="text-sm font-semibold text-neutral-900">Tu lista está esperando sus primeros favoritos.</p><Link to="/catalog" className="mt-1 inline-block text-xs font-bold text-red-800 hover:underline">Explorar productos</Link></div></div>}
  </section>
}

