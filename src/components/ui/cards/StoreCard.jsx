import { Eye, Heart, Image as ImageIcon, MapPin, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import StoreVisitButton from '../buttons/StoreVisitButton'
import ProductBadge from '../badges/ProductBadge'

function ActionButton({ label, children, to }) {
  const className = 'grid size-8 place-items-center rounded-full bg-dark-950 text-dark-white transition duration-200 hover:scale-105 hover:bg-dark-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red motion-reduce:transform-none'
  return to
    ? <Link to={to} aria-label={label} className={className}>{children}</Link>
    : <button type="button" aria-label={label} className={`${className} cursor-pointer`}>{children}</button>
}

export default function StoreCard({ store }) {
  return (
    <article id={store.slug} className="min-w-0 scroll-mt-6 pt-3">
      <div className="relative aspect-[3/4] bg-dark-200">
        <Link to={`/stores#${store.slug}`} aria-label={`Ver ${store.name}`} className="block h-full w-full overflow-hidden rounded-xl">
          <img src={store.image} alt={`Interior de ${store.name}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        </Link>
        {store.badge && <div className="absolute -left-2 -top-3 z-20"><ProductBadge label={store.badge} variant="descuento" /></div>}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          <ActionButton label={`Vista rápida de ${store.name}`} to={`/stores#${store.slug}`}><Eye size={15} /></ActionButton>
          <ActionButton label={`Agregar ${store.name} a favoritos`}><Heart size={15} /></ActionButton>
          <ActionButton label={`Compartir ${store.name}`}><Share2 size={14} /></ActionButton>
        </div>
      </div>

      <div className="px-1 pt-4">
        <div className="flex items-center gap-3">
          <div className="grid size-16 shrink-0 place-items-center border border-dark-500 bg-dark-white font-display text-5xl font-black leading-none text-dark-950">{store.initial}</div>
          <div className="min-w-0">
            <h2 className="font-display text-2xl uppercase leading-none tracking-[-0.04em] text-dark-950">{store.name}</h2>
            <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.16em] text-dark-500">{store.subtitle}</p>
          </div>
        </div>
        <p className="mt-4 min-h-24 text-sm font-light leading-relaxed text-dark-500">{store.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-medium text-dark-700">
          <span className="inline-flex items-center gap-1.5"><MapPin size={13} fill="currentColor" />{store.city}</span>
          <span className="inline-flex items-center gap-1.5"><ImageIcon size={14} />{store.productsCount} Productos disponibles</span>
        </div>
        <div className="mt-5"><StoreVisitButton slug={store.slug} /></div>
      </div>
    </article>
  )
}
