import { MapPin, Package } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StoreShowcaseCard({ store, variant = 'small' }) {
  const isLarge = variant === 'large'

  return <Link to="/stores" className={`group block h-full overflow-hidden rounded-lg border border-dark-200 bg-white text-dark-950 transition-colors duration-300 hover:border-dark-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red ${isLarge ? 'flex flex-col' : ''}`}>
    <article className="flex h-full flex-col">
      <div className={`overflow-hidden bg-dark-100 ${isLarge ? 'min-h-0 flex-1' : 'h-40 sm:h-48 lg:h-[62%]'}`}><img src={store.image} alt={`Tienda ${store.name}`} loading="lazy" className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.025]" /></div>
      <div className={`border-t border-dark-200 bg-white ${isLarge ? 'p-6 lg:p-8' : 'p-3 sm:p-4'}`}>
        <div className="flex gap-3 sm:gap-4"><div className={`grid shrink-0 place-items-center border border-dark-300 font-display font-black text-dark-950 ${isLarge ? 'size-20 text-5xl lg:size-24 lg:text-6xl' : 'size-12 text-3xl lg:size-14 lg:text-4xl'}`}>{store.initial}</div><div className="min-w-0 pt-0.5"><h3 className={`font-display font-black uppercase leading-none tracking-[-0.02em] ${isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'}`}>{store.name}</h3><p className={`mt-1 truncate font-bold uppercase tracking-[0.15em] text-dark-500 ${isLarge ? 'text-[10px] lg:text-xs' : 'text-[8px] lg:text-[0.6rem]'}`}>{store.subtitle}</p>{isLarge && <p className="mt-3 line-clamp-3 max-w-md text-sm font-light leading-snug text-dark-600">{store.description}</p>}<div className={`mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[9px] font-medium text-dark-900 sm:text-[10px] ${isLarge ? 'sm:mt-4 sm:text-xs' : ''}`}><span className="inline-flex items-center gap-1"><MapPin size={isLarge ? 14 : 11} fill="currentColor" />{store.location}</span><span className="inline-flex items-center gap-1"><Package size={isLarge ? 14 : 11} />{store.productsCount} productos disponibles</span></div></div></div>
      </div>
    </article>
  </Link>
}
