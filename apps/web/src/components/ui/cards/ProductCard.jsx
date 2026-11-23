import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Gift, Heart, Share2, ShoppingCart } from 'lucide-react'
import { productActionsData } from '../../../data/ui.js'
import ProductBadge from '../badges/ProductBadge'
import ColorDot from '../buttons/ColorDot'
import GarmentSwitch from '../buttons/GarmentSwitch'
import IconActionButton from '../buttons/IconActionButton'
import SizeButton from '../buttons/SizeButton'
import StoreCardButton from '../buttons/StoreCardButton'
import { FAVORITES_UPDATED_EVENT, isFavorite as isProductFavorite, toggleFavorite } from '../../../commons/storage/favoritesStorage'
import { addToCart } from '../../../commons/storage/cartStorage'
import { showToast } from '../../../utils/toast'

const actionIcons = { Eye, Heart, ShoppingCart, Share2 }
const ACTIONS = productActionsData.map(({ icon, ...action }) => ({ ...action, icon: actionIcons[icon] }))

const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export default function ProductCard({ product, badgeLabel = null, isOutlet = false, compact = false, alwaysShowActions = false, priceAccent = false, iconHoverRedOnly = false, onCardMouseEnter, onCardMouseLeave, onCardFocus, onCardBlur }) {
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0])
  const currentPrice = (product.colorPrices?.[selectedColor] ?? product.price) + (product.sizePriceAdjustments?.[selectedSize] ?? 0)
  const [viewMode, setViewMode] = useState('model')
  const [hovered, setHovered] = useState(false)
  const [currentImgIndex, setCurrentImgIndex] = useState(0)
  const [flashPhase, setFlashPhase] = useState('idle')
  const hoverDelay = useRef(null)
  const intervalRef = useRef(null)
  const shotTimers = useRef([])
  const firing = useRef(false)
  const viewImages = viewMode === 'model' ? product.imagesModel : product.imagesGarment
  const images = viewImages?.length ? viewImages : product.images?.length ? product.images : [product.image]
  const clearShotTimers = () => {
    shotTimers.current.forEach(window.clearTimeout)
    shotTimers.current = []
  }

  const fireFlash = () => {
    if (firing.current || images.length < 2) return
    firing.current = true
    setFlashPhase('peak')
    shotTimers.current.push(window.setTimeout(() => {
      setCurrentImgIndex((index) => (index + 1) % images.length)
      setFlashPhase('fade')
    }, 70))
    shotTimers.current.push(window.setTimeout(() => {
      setFlashPhase('idle')
      firing.current = false
    }, 500))
  }

  const startPhotoSequence = () => {
    if (hoverDelay.current || intervalRef.current || images.length < 2) return
    images.forEach((src) => {
      const preload = new Image()
      preload.src = src
    })
    hoverDelay.current = window.setTimeout(() => {
      hoverDelay.current = null
      fireFlash()
      intervalRef.current = window.setInterval(fireFlash, 1800)
    }, 150)
  }

  const stopPhotoSequence = () => {
    window.clearTimeout(hoverDelay.current)
    window.clearInterval(intervalRef.current)
    hoverDelay.current = null
    intervalRef.current = null
    clearShotTimers()
    firing.current = false
    setFlashPhase('idle')
    setCurrentImgIndex(0)
  }

  useEffect(() => {
    if (hovered) startPhotoSequence()
    else stopPhotoSequence()
    return () => {
      window.clearTimeout(hoverDelay.current)
      window.clearInterval(intervalRef.current)
      clearShotTimers()
      hoverDelay.current = null
      intervalRef.current = null
      firing.current = false
    }
  }, [hovered, images.length, product.id, viewMode])
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

  const handleAction = (action) => (event) => {
    event.stopPropagation()
    // Route by action type so translated/accessibility text cannot break preview navigation.
    if (action.icon === Eye) {
      navigate(`/preview/${productSlug}`)
      return
    }
    if (action.icon === Heart) {
      const result = toggleFavorite(product)
      setFavorite(result.isFavorite)
      showToast('success', result.isFavorite ? 'Producto agregado a tus favoritos.' : 'Producto eliminado de tus favoritos.')
    }
    if (action.icon === ShoppingCart) {
      addToCart({ ...product, price: currentPrice }, { size: selectedSize ?? product.sizes?.[0], color: selectedColor })
      showToast('success', 'Producto agregado al carrito.')
    }
    if (action.icon === Share2) {
      const url = window.location.origin + `/preview/${productSlug}`
      if (navigator.share) {
        navigator.share({ title: product.name, url }).then(() => showToast('success', 'Enlace del producto compartido.')).catch(() => {})
      } else {
        navigator.clipboard?.writeText(url).then(() => showToast('success', 'Enlace del producto copiado.')).catch(() => showToast('info', 'No se pudo copiar el enlace.'))
      }
    }
  }

  return (
    <article
      data-outlet={isOutlet || undefined}
      onMouseEnter={(event) => { setHovered(true); onCardMouseEnter?.(event) }}
      onMouseLeave={(event) => { setHovered(false); onCardMouseLeave?.(event) }}
      onFocus={onCardFocus}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) onCardBlur?.()
      }}
      className={`group relative flex cursor-pointer flex-col overflow-visible border border-dark-200 bg-dark-white dark:border-[#2a2a2d] dark:bg-[#1a1a1d] ${compact ? 'w-full min-w-0 max-w-none' : 'w-[264px] min-w-[264px] max-w-[264px] flex-none sm:w-72 sm:min-w-72 sm:max-w-72'}`}
    >
      {displayBadge && <div className="absolute -left-2 -top-3 z-20"><ProductBadge {...displayBadge} /></div>}

      <div className="relative aspect-[3/4] w-full min-w-0 shrink-0 overflow-hidden bg-dark-100">
        <img
          src={images[currentImgIndex] || product.image}
          alt={product.name}
          loading={isOutlet ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 block h-full w-full max-w-full object-cover object-top transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.035] ${flashPhase === 'fade' ? 'brightness-[1.6] scale-[1.04]' : ''} ${viewMode === 'model' ? 'saturate-100' : 'saturate-[.85]'}`}
        />
        <span aria-hidden="true" className={`pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,#fff_0%,rgba(255,255,255,.9)_40%,rgba(255,255,255,.6)_100%)] transition-opacity ease-out ${flashPhase === 'peak' ? 'opacity-100 duration-75' : flashPhase === 'fade' ? 'opacity-0 duration-300' : 'opacity-0 duration-0'}`} />
        {flashPhase !== 'idle' && <span aria-hidden="true" className={`pointer-events-none absolute right-8 top-8 z-10 size-2 rounded-full bg-white shadow-[0_0_16px_8px_rgba(255,255,255,.8)] transition-opacity duration-300 ${flashPhase === 'peak' ? 'opacity-100' : 'opacity-0'}`} />}
        <div className={`absolute right-3 top-3 z-20 flex flex-col gap-2 transition-all duration-300 ${alwaysShowActions ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}>
          {ACTIONS.map((action) => <IconActionButton key={action.label} {...action} label={action.icon === Eye ? 'Ver producto' : action.icon === Heart ? (favorite ? 'Quitar de favoritos' : 'Agregar a favoritos') : action.label} onClick={handleAction(action)} className={!iconHoverRedOnly && action.icon === Heart && favorite ? 'bg-dark-red hover:bg-dark-950' : ''} iconClassName={action.icon === Heart && favorite ? 'fill-current' : ''} hoverColorOnly={iconHoverRedOnly} />)}
        </div>
        <div className="absolute bottom-3 left-3 z-10">
          <GarmentSwitch value={viewMode} onChange={(mode) => { setCurrentImgIndex(0); setViewMode(mode) }} />
        </div>
      </div>

      <div className={`flex min-w-0 flex-1 flex-col bg-dark-white dark:bg-[#1a1a1d] ${compact ? 'min-h-[226px] p-3' : 'min-h-[248px] p-4'}`}>
        <h3 className="line-clamp-2 min-h-10 text-base font-bold uppercase leading-tight text-dark-950 dark:text-white">{product.name}</h3>
        <p className="mt-1 line-clamp-2 min-h-9 text-xs leading-4 text-dark-500 sm:text-sm dark:text-gray-400">{product.description}</p>

        <div className="mt-2 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-0.5">
          {isGift ? (
            <><Gift size={17} className="text-dark-red" /><span className="text-base font-black text-dark-red">GRATIS</span></>
          ) : (
            <>
              <span className={`text-base font-black transition-all duration-300 ${isDiscount || priceAccent ? 'text-dark-red' : 'text-dark-950 dark:text-white'}`}>{money.format(currentPrice)}</span>
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


