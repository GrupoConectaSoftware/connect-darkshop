import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Gift, Heart, Share2, ShoppingCart } from 'lucide-react'
import ProductBadge from '../badges/ProductBadge'
import ColorDot from '../buttons/ColorDot'
import GarmentSwitch from '../buttons/GarmentSwitch'
import IconActionButton from '../buttons/IconActionButton'
import SizeButton from '../buttons/SizeButton'
import StoreCardButton from '../buttons/StoreCardButton'
import { FAVORITES_UPDATED_EVENT, isFavorite as isProductFavorite, toggleFavorite } from '../../../commons/storage/favoritesStorage'
import { addToCart } from '../../../commons/storage/cartStorage'

const ACTIONS = [
  { icon: Eye, label: 'Vista rápida' },
  { icon: Heart, label: 'Agregar a favoritos' },
  { icon: ShoppingCart, label: 'Agregar al carrito' },
  { icon: Share2, label: 'Compartir producto' },
]

const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export default function ProductCard({ product, badgeLabel = null, isOutlet = false, compact = false, alwaysShowActions = false, priceAccent = false, onCardMouseEnter, onCardMouseLeave, onCardFocus, onCardBlur }) {
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const [viewMode, setViewMode] = useState('garment')
  const [favorite, setFavorite] = useState(() => isProductFavorite(product))
  const displayBadge = badgeLabel ? { label: badgeLabel, variant: 'recommended' } : product.badge
  const isGift = displayBadge?.variant === 'obsequio'
  const isDiscount = displayBadge?.variant === 'descuento'
  const productSlug = product.slug || `${product.name}-${product.id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  useEffect(() => {
    const syncFavorite = () => setFavorite(isProductFavorite(product))

    syncFavorite()
    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorite)
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorite)
  }, [product])

  const handleAction = (label) => (event) => {
    event.stopPropagation()
    if (label === 'Vista rápida') navigate(`/preview/${productSlug}`)
    if (label === 'Agregar a favoritos') setFavorite(toggleFavorite(product).isFavorite)
    if (label === 'Agregar al carrito') addToCart(product)
  }

  return (
    <article
      data-outlet={isOutlet || undefined}
      onMouseEnter={onCardMouseEnter}
      onMouseLeave={onCardMouseLeave}
      onFocus={onCardFocus}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onCardBlur?.()
      }}
      className={`group relative flex cursor-pointer flex-col overflow-visible border border-dark-200 bg-dark-white ${compact ? 'w-full min-w-0 max-w-none' : 'w-[264px] min-w-[264px] max-w-[264px] flex-none sm:w-72 sm:min-w-72 sm:max-w-72'}`}
    >
      {displayBadge && <div className="absolute -left-2 -top-3 z-20"><ProductBadge {...displayBadge} /></div>}

      <div className="relative aspect-[3/4] w-full min-w-0 shrink-0 overflow-hidden bg-dark-100">
        <img
          src={product.image}
          alt={product.name}
          loading={isOutlet ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 block h-full w-full max-w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] ${viewMode === 'model' ? 'saturate-100' : 'saturate-[.85]'}`}
        />
        <div className={`absolute right-3 top-3 z-20 flex flex-col gap-2 transition-all duration-300 ${alwaysShowActions ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
          {ACTIONS.map((action) => <IconActionButton key={action.label} {...action} label={action.icon === Heart ? (favorite ? 'Quitar de favoritos' : 'Agregar a favoritos') : action.label} onClick={handleAction(action.label)} className={action.icon === Heart && favorite ? 'bg-dark-red hover:bg-dark-950' : ''} iconClassName={action.icon === Heart && favorite ? 'fill-current' : ''} />)}
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <GarmentSwitch value={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <div className={`flex min-w-0 flex-1 flex-col bg-dark-white ${compact ? 'min-h-[226px] p-3' : 'min-h-[248px] p-4'}`}>
        <h3 className="line-clamp-2 min-h-10 text-base font-bold uppercase leading-tight text-dark-950">{product.name}</h3>
        <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-4 text-dark-500 sm:text-sm">{product.description}</p>

        <div className="mt-2 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-0.5">
          {isGift ? (
            <><Gift size={17} className="text-dark-red" /><span className="text-base font-black text-dark-red">GRATIS</span></>
          ) : (
            <>
              <span className={`text-base font-black ${isDiscount || priceAccent ? 'text-dark-red' : 'text-dark-950'}`}>{money.format(product.price)}</span>
              {product.originalPrice && <span className="text-sm text-dark-400 line-through">{money.format(product.originalPrice)}</span>}
              {isDiscount && <span className="text-[10px] font-bold text-dark-red">-{product.discount}%</span>}
            </>
          )}
        </div>

        <div className="mt-2 flex min-h-4 items-center gap-2">
          {product.colors?.map((color) => <ColorDot key={color} color={color} selected={selectedColor === color} onSelect={setSelectedColor} />)}
        </div>
        <div className="mt-2 flex min-h-7 flex-wrap items-center gap-1.5">
          {product.sizes.map((size) => (
            <SizeButton
              key={size}
              size={size}
              selected={selectedSize === size}
              unavailable={product.unavailableSizes?.includes(size)}
              onSelect={setSelectedSize}
            />
          ))}
        </div>
        <div className="mt-auto pt-3"><StoreCardButton storeName={product.brand} brandType={product.brandType} /></div>
      </div>
    </article>
  )
}
