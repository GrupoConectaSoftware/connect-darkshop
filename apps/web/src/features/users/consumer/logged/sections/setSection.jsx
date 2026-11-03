import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, Heart, Info, Search, Share2, ShoppingBag } from 'lucide-react'
import outletOne from '../../../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../../../assets/Sections/homespages/outlet/products/outletTres.webp'
import outletFour from '../../../../../assets/Sections/homespages/outlet/products/outletCuatro.webp'
import { addToCart } from '../../../../../commons/storage/cartStorage'
import { isFavorite, toggleFavorite } from '../../../../../commons/storage/favoritesStorage'
import ImageZoomModal from '../../../../../components/ux/ImageZoomModal'
import IconActionButton from '../../../../../components/ui/buttons/IconActionButton'
import StoreCardButton from '../../../../../components/ui/buttons/StoreCardButton'

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const description = 'Un conjunto casual de estética limpia y versátil, creado para llevarse como una sola pieza visual. Sus prendas combinan siluetas amplias, materiales cómodos y una paleta fácil de usar en cualquier momento del día.'

const SETS = [
  { id: 'set-verano-relax', slug: 'conjunto-verano-relax', name: 'Conjunto verano relax', subtitle: 'Conjunto verano · 280 GSM · Masculino', price: 125000, compareAt: 150000, description, images: [outletTwo, outletFour, outletOne], pieceStock: [12, 0, 5], storeName: 'DYNAMO BRAND', brandType: 'ONLINE' },
  { id: 'set-nocturno', slug: 'conjunto-nocturno', name: 'Conjunto nocturno', subtitle: 'Essential black · 320 GSM · Unisex', price: 145000, compareAt: 175000, description: 'Una composición completamente negra que mezcla volumen, textura y comodidad. El conjunto se entrega completo y está pensado para construir un look urbano sin esfuerzo.', images: [outletOne, outletTwo, outletFour], pieceStock: [3, 7, 2], storeName: 'DARK', brandType: 'TIENDA OFICIAL' },
  { id: 'set-oceanico', slug: 'conjunto-oceanico', name: 'Conjunto oceánico', subtitle: 'Blue capsule · 260 GSM · Unisex', price: 138000, compareAt: null, description: 'Azul profundo y negro se encuentran en un conjunto de corte relajado. Una propuesta completa para sumar color sin perder la identidad sobria de Darkshop.', images: [outletThree, outletOne, outletTwo], pieceStock: [0, 4, 11], storeName: 'AMERICAN EAGLE', brandType: 'ONLINE' },
  { id: 'set-medusa', slug: 'conjunto-medusa', name: 'Conjunto Medusa', subtitle: 'Drop Medusa · 300 GSM · Masculino', price: 152000, compareAt: 185000, description: 'Un conjunto de líneas contundentes, proporciones amplias y acabado monocromático. Se vende como una unidad completa para conservar la intención del look.', images: [outletFour, outletTwo, outletOne], pieceStock: [8, 3, 0], storeName: 'DARK', brandType: 'TIENDA OFICIAL' },
  { id: 'set-dark-core', slug: 'conjunto-dark-core', name: 'Conjunto Dark Core', subtitle: 'Dark essentials · 300 GSM · Unisex', price: 149000, compareAt: null, description: 'Capas esenciales y tonos oscuros reunidos en una propuesta funcional. Cada elemento forma parte del conjunto y la compra corresponde al look completo.', images: [outletOne, outletFour, outletThree], pieceStock: [6, 0, 9], storeName: 'DYNAMO BRAND', brandType: 'PRESENCIAL' },
  { id: 'set-street-uniform', slug: 'conjunto-street-uniform', name: 'Street uniform', subtitle: 'Street series · 280 GSM · Masculino', price: 132000, compareAt: 160000, description: 'Una selección equilibrada de básicos amplios para vestir la calle. El conjunto reúne tres prendas coordinadas y se agrega al carrito como un solo artículo.', images: [outletTwo, outletThree, outletFour], pieceStock: [0, 0, 0], inStock: false, storeName: 'MONCLER FRIEND', brandType: 'ONLINE' },
].map((set) => ({
  ...set,
  inStock: set.inStock ?? true,
  pieces: set.images.map((image, index) => {
    const pieceNames = ['Prenda principal', 'Capa esencial', 'Complemento del look']
    const pieceSlugs = ['prenda-principal', 'capa-esencial', 'complemento-del-look']
    return {
      id: `${set.id}-${index}`,
      slug: `${set.slug}-${pieceSlugs[index]}`,
      name: pieceNames[index],
      image,
      stock: set.pieceStock[index],
    }
  }),
}))

const SIZES = ['XS', 'S', 'M', 'L', 'XL']
const COLORS = [
  { name: 'Gris', value: '#d4d4d4', className: 'bg-[#d4d4d4]' },
  { name: 'Vino', value: '#491c25', className: 'bg-dark-burgundy' },
  { name: 'Blanco', value: '#ffffff', className: 'bg-white' },
  { name: 'Negro', value: '#080808', className: 'bg-dark-950' },
]

function SetGallery({ set, favorite, activeIndex, onImageSelect, onFavorite, onShowPieces, previewRef }) {
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const activeImage = set.images[activeIndex] ?? set.images[0]

  const handleShare = async () => {
    const data = { title: set.name, text: `Mira este conjunto completo en Darkshop: ${set.name}`, url: window.location.href }
    if (navigator.share) await navigator.share(data).catch(() => {})
    else if (navigator.clipboard) await navigator.clipboard.writeText(window.location.href).catch(() => {})
  }

  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-[7.25rem_minmax(0,1fr)] sm:gap-4">
      <div className="order-2 grid grid-cols-3 gap-3 sm:order-1 sm:flex sm:flex-col sm:gap-4">
        {set.images.map((image, index) => (
          <button key={`${set.id}-${index}`} type="button" aria-label={`Ver imagen ${index + 1} de ${set.name}`} aria-pressed={activeIndex === index} onClick={() => onImageSelect(index)} className={`aspect-[3/4] cursor-pointer overflow-hidden bg-dark-100 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${activeIndex === index ? 'border-2 border-dark-950' : 'border border-dark-200 hover:border-dark-700'}`}>
            <img src={image} alt="" className={`size-full object-cover object-top transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`} />
          </button>
        ))}
      </div>

      <div ref={previewRef} className="relative order-1 min-h-[32rem] overflow-hidden border border-dark-300 bg-dark-100 sm:order-2 sm:min-h-[42rem] lg:min-h-[48rem]">
        <img key={`${set.id}-${activeIndex}`} src={activeImage} alt={`${set.pieces[activeIndex]?.name ?? 'Prenda'} de ${set.name}`} className="absolute inset-0 size-full object-cover object-top" />
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 sm:right-4 sm:top-4">
          <IconActionButton icon={Eye} label="Ver prendas incluidas" onClick={onShowPieces} />
          <IconActionButton icon={Heart} label={favorite ? 'Quitar conjunto de favoritos' : 'Guardar conjunto en favoritos'} onClick={onFavorite} className={favorite ? 'bg-dark-red hover:bg-dark-950' : ''} iconClassName={favorite ? 'fill-current' : ''} />
          <IconActionButton icon={Share2} label="Compartir conjunto" onClick={handleShare} />
        </div>
        <button type="button" aria-label="Ampliar imagen" onClick={() => setIsZoomOpen(true)} className="absolute bottom-4 left-4 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-white text-dark-950 shadow-md transition hover:scale-105 hover:bg-dark-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red"><Search size={21} /></button>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-5 pb-5 pl-20 pt-20 text-right text-white sm:pl-24">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">Vista individual · {set.pieces[activeIndex]?.name}</p>
          <p className="mt-1 ml-auto max-w-md text-xs leading-relaxed text-white/90">Prenda del conjunto con disponibilidad según su inventario individual.</p>
        </div>
      </div>
      <ImageZoomModal isOpen={isZoomOpen} onClose={() => setIsZoomOpen(false)} src={activeImage} alt={set.name} />
    </div>
  )
}

function SetPiecesRow({ pieces, sectionRef, activePieceIndex, onSelectPiece }) {
  return (
    <div ref={sectionRef} className="mt-7 scroll-mt-32 border-t border-dark-200 pt-6">
      <div className="flex items-end justify-between gap-4">
        <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-500">Compuesto por</p><p className="mt-1 text-sm font-semibold text-dark-950">3 prendas · stock individual</p></div>
        <span className="text-right text-[10px] font-medium uppercase tracking-[0.12em] text-dark-red">Disponibilidad por prenda</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {pieces.map((piece, index) => (
          <button key={piece.id} type="button" aria-label={`Previsualizar ${piece.name}`} aria-pressed={activePieceIndex === index} title={`${piece.name}: ${piece.stock > 0 ? `${piece.stock} disponibles` : 'agotada'}`} onClick={() => onSelectPiece(index)} className="group min-w-0 cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">
            <span className={`relative block aspect-square overflow-hidden border bg-dark-50 transition-colors group-hover:border-dark-950 ${activePieceIndex === index ? 'border-2 border-dark-950' : 'border-dark-200'}`}>
              <img src={piece.image} alt={piece.name} className={`size-full object-cover object-top transition duration-300 ${piece.stock > 0 ? 'opacity-100 group-hover:scale-[1.03] group-hover:opacity-90' : 'opacity-40'}`} />
              {piece.stock === 0 && <span className="absolute inset-0 grid place-items-center bg-black/30 px-2 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white">Agotado</span>}
            </span>
            <span className="mt-2 block truncate text-[10px] font-semibold uppercase tracking-wide text-dark-600">{piece.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SetInfo({ set, piecesRef, activePieceIndex, onSelectPiece }) {
  const [size, setSize] = useState('S')
  const [color, setColor] = useState(COLORS[3])
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({ ...set, image: set.images[0], sizes: SIZES, colors: COLORS.map((item) => item.value), store: { name: 'DARK', label: 'TIENDA OFICIAL', slug: 'dark' } }, { quantity: 1, size, color: color.value, colorName: color.name, colorClass: color.className })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="min-w-0 pt-1 lg:pt-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-red">Colección de conjuntos</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.45rem)] uppercase leading-[0.9] tracking-[-0.045em] text-dark-950">{set.name}</h2>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.16em] text-dark-500">{set.subtitle}</p>
      <div className="mt-5 flex flex-wrap items-baseline gap-3"><strong className="text-3xl font-black tracking-[-0.04em] text-dark-950">{money.format(set.price)}</strong>{set.compareAt && <span className="text-xs text-dark-400 line-through">{money.format(set.compareAt)}</span>}{set.compareAt && <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-dark-red">Descuento</span>}</div>
      <p className="mt-5 max-w-xl text-sm font-light leading-6 text-dark-600">{set.description}</p>
      <div className="my-6 border-t border-dark-200" />

      <fieldset>
        <legend className="text-[11px] font-bold uppercase tracking-[0.16em] text-dark-700">Tallas</legend>
        <div className="mt-3 grid grid-cols-5 gap-2">{SIZES.map((item) => <button key={item} type="button" aria-pressed={size === item} onClick={() => setSize(item)} className={`relative h-10 cursor-pointer border text-[11px] font-semibold uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${size === item ? 'border-dark-950 bg-dark-950 text-white' : 'border-dark-300 text-dark-700 hover:border-dark-950'}`}>{item}</button>)}</div>
        <p className="mt-3 flex items-start gap-2 text-[11px] italic leading-relaxed text-dark-500"><Info size={13} className="mt-0.5 shrink-0" />Fit oversize. Si prefieres un ajuste más regular, elige una talla menos.</p>
      </fieldset>

      <div className="mt-6 border-t border-dark-200 pt-6">
        <fieldset className="flex items-center gap-3"><legend className="float-left mr-3 text-sm font-semibold text-dark-950">Color:</legend>{COLORS.map((item) => <button key={item.name} type="button" aria-label={`Seleccionar color ${item.name}`} aria-pressed={color.name === item.name} onClick={() => setColor(item)} className={`size-6 cursor-pointer rounded-full border border-dark-400 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${item.className} ${color.name === item.name ? 'ring-2 ring-dark-950 ring-offset-2' : 'hover:ring-1 hover:ring-dark-400 hover:ring-offset-1'}`} />)}</fieldset>
      </div>

      <button type="button" onClick={handleAddToCart} className="mt-7 flex h-14 w-full cursor-pointer items-center justify-center gap-3 bg-dark-950 px-5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-dark-burgundy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red"><ShoppingBag size={18} />{added ? 'Conjunto agregado' : 'Comprar ahora'}</button>
      <p className="mt-3 text-xs italic text-dark-500">Venta protegida por <strong className="font-bold">Wompi</strong></p>

      <div className="mt-6"><StoreCardButton storeName={set.storeName} brandType={set.brandType} /></div>
      <SetPiecesRow pieces={set.pieces} sectionRef={piecesRef} activePieceIndex={activePieceIndex} onSelectPiece={onSelectPiece} />
    </div>
  )
}

function SetCarousel({ sets, activeSetId, onSelect, showEdgeAffordances = false }) {
  const carouselRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const shouldShowEdgeAffordances = showEdgeAffordances || sets.length >= 4
  const move = useCallback((direction) => {
    const carousel = carouselRef.current
    if (!carousel) return
    const firstCard = carousel.querySelector('[data-set-card]')
    const step = firstCard ? firstCard.getBoundingClientRect().width + 16 : carousel.clientWidth * 0.82
    const isAtStart = carousel.scrollLeft <= 8
    const isAtEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8
    if (direction > 0 && isAtEnd) carousel.scrollTo({ left: 0, behavior: 'smooth' })
    else if (direction < 0 && isAtStart) carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' })
    else carousel.scrollBy({ left: step * direction, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isPaused || sets.length < 4) return undefined
    const timer = window.setInterval(() => move(1), 5000)
    return () => window.clearInterval(timer)
  }, [isPaused, move, sets.length])

  // Se conserva la navegación entre conjuntos incluso cuando una tienda tiene dos opciones.
  if (sets.length < 2) return null

  return (
    <section aria-labelledby="other-sets-title" className="relative mt-20 w-full overflow-hidden lg:mt-28">
      <div className="mx-auto mb-8 max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-end justify-between gap-6 border-b border-dark-200 pb-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-dark-red">Sigue explorando</p><h2 id="other-sets-title" className="mt-2 font-display text-3xl uppercase leading-none tracking-[-0.04em] text-dark-950 sm:text-4xl">Otros conjuntos</h2></div><p className="hidden max-w-sm text-right text-xs leading-relaxed text-dark-500 sm:block">Selecciona un conjunto para cargar todos sus detalles arriba.</p></div>
      </div>
      <div className="group relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }}>
        <div ref={carouselRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-5 py-5 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-8 lg:px-12 xl:px-16">
          {sets.map((item) => {
            const isActive = item.id === activeSetId
            return (
            <article key={item.id} data-set-card className={`w-[74vw] max-w-[400px] shrink-0 snap-start overflow-hidden bg-white transition duration-300 ease-out sm:w-[42vw] lg:w-[28vw] xl:w-[400px] ${isActive ? 'z-10 scale-105 border-2 border-dark-950 opacity-100 ring-2 ring-dark-950 ring-offset-2' : item.inStock ? 'scale-100 border border-dark-200 opacity-70 hover:border-dark-950 hover:opacity-90' : 'scale-100 border border-dark-200 opacity-50'}`}>
              <button type="button" disabled={!item.inStock} aria-label={item.inStock ? `Ver ${item.name}` : `${item.name} agotado`} aria-current={isActive ? 'true' : undefined} onClick={() => onSelect(item)} className="group/card block w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red disabled:cursor-not-allowed">
                <div className="relative aspect-[2/3] overflow-hidden bg-dark-100"><img src={item.images[0]} alt={item.name} loading="lazy" className="size-full object-cover object-top transition-transform duration-500 group-hover/card:scale-[1.03]" />{!item.inStock && <span className="absolute inset-0 grid place-items-center bg-black/45 text-xs font-bold uppercase tracking-[0.22em] text-white">Agotado</span>}</div>
                <div className="p-4 sm:p-5"><h3 className="font-display text-xl uppercase leading-[0.95] tracking-[-0.03em] text-dark-950 sm:text-2xl">{item.name}</h3><p className="mt-2 text-sm font-black text-dark-950">{money.format(item.price)}</p><div className="mt-4"><StoreCardButton storeName={item.storeName} brandType={item.brandType} /></div></div>
              </button>
            </article>
          )})}
        </div>
        {shouldShowEdgeAffordances && <>
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-28 bg-gradient-to-r from-white via-white/75 to-transparent lg:block" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-28 bg-gradient-to-l from-white via-white/75 to-transparent lg:block" />
          <button type="button" aria-label="Conjunto anterior" onClick={() => move(-1)} className="absolute left-4 top-1/2 z-30 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/30 bg-black/30 text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red lg:grid"><ArrowLeft size={20} /></button>
          <button type="button" aria-label="Siguiente conjunto" onClick={() => move(1)} className="absolute right-4 top-1/2 z-30 hidden size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-white/30 bg-black/30 text-white shadow-md backdrop-blur-md transition hover:scale-105 hover:bg-black/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red lg:grid"><ArrowRight size={20} /></button>
        </>}
      </div>
    </section>
  )
}

export default function SetSection({ storeFilter = null, homeHref = '/logged', collectionHref = '/catalog?category=conjuntos', showCarouselAffordances = false }) {
  const { slug } = useParams()
  const visibleSets = storeFilter
    ? SETS.filter((set) => set.storeName.toLowerCase() === storeFilter.toLowerCase())
    : SETS
  const initialSet = visibleSets.find((set) => set.slug === slug) ?? visibleSets[0]

  if (!initialSet) return null

  return <SetSectionContent key={`${storeFilter ?? 'all'}-${initialSet.id}`} initialSet={initialSet} visibleSets={visibleSets} homeHref={homeHref} collectionHref={collectionHref} showCarouselAffordances={showCarouselAffordances} />
}

function SetSectionContent({ initialSet, visibleSets, homeHref, collectionHref, showCarouselAffordances }) {
  const [activeSetId, setActiveSetId] = useState(initialSet.id)
  const activeSet = visibleSets.find((set) => set.id === activeSetId) ?? initialSet
  const [favorite, setFavorite] = useState(() => isFavorite(initialSet))
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const sectionRef = useRef(null)
  const piecesRef = useRef(null)
  const previewRef = useRef(null)

  const handleSelectSet = (nextSet) => {
    if (nextSet.id === activeSet.id) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setActiveSetId(nextSet.id)
    setActiveImageIndex(0)
    setFavorite(isFavorite(nextSet))
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFavorite = () => {
    const result = toggleFavorite({ ...activeSet, image: activeSet.images[0], category: 'Conjuntos', brand: 'DARK' })
    setFavorite(result.isFavorite)
  }

  const handleSelectPiece = (index) => {
    setActiveImageIndex(index)
    window.requestAnimationFrame(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
  }

  return (
    <section ref={sectionRef} id="conjuntos" className="w-full overflow-x-hidden scroll-mt-28 bg-white pb-16 text-dark-950 sm:pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[1600px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 xl:px-16">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-dark-500"><Link to={homeHref} className="text-dark-red transition-colors hover:text-dark-burgundy">Inicio</Link><span>/</span><Link to={collectionHref} className="transition-colors hover:text-dark-950">Conjuntos</Link><span>/</span><span className="text-dark-950">{activeSet.name}</span></nav>
        <div key={activeSet.id} className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(22rem,0.88fr)] lg:gap-12 xl:gap-16">
          <SetGallery set={activeSet} activeIndex={activeImageIndex} onImageSelect={setActiveImageIndex} favorite={favorite} onFavorite={handleFavorite} onShowPieces={() => piecesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} previewRef={previewRef} />
          <SetInfo set={activeSet} piecesRef={piecesRef} activePieceIndex={activeImageIndex} onSelectPiece={handleSelectPiece} />
        </div>
      </div>
      <SetCarousel sets={visibleSets} activeSetId={activeSet.id} onSelect={handleSelectSet} showEdgeAffordances={showCarouselAffordances} />
    </section>
  )
}
