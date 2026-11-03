import { AlertCircle, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { addToCart } from '../../../../../commons/storage/cartStorage'

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export default function DescriptionComponents({ product }) {
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  return (
    <section className="min-w-0 pt-1 lg:pt-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-dark-500">{product.category} · {product.gender}</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.7rem)] uppercase leading-[0.92] tracking-[-0.045em] text-dark-950">{product.name}</h1>
      <p className="mt-3 text-sm leading-relaxed text-dark-600">{product.description}</p>

      <div className="mt-7 flex items-center gap-4 border-b border-dark-200 pb-6">
        <span className="text-3xl font-bold tracking-tight text-dark-950">{money.format(product.price)}</span>
        <span className="text-sm text-dark-400 line-through">{money.format(product.originalPrice)}</span>
        <span className="ml-auto shrink-0 -rotate-2 bg-dark-burgundy px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">-{product.discount}% descuento</span>
      </div>

      <div className="border-b border-dark-200 py-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-dark-500">Tallas</p>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {product.sizes.map((item) => {
            const unavailable = product.unavailableSizes.includes(item)
            return <button key={item} type="button" disabled={unavailable} onClick={() => setSize(item)} className={`relative h-11 border text-xs font-semibold transition-colors ${unavailable ? 'cursor-not-allowed border-dark-200 text-dark-300' : size === item ? 'cursor-pointer border-dark-950 bg-dark-950 text-white' : 'cursor-pointer border-dark-300 text-dark-700 hover:border-dark-950'}`}><span className={unavailable ? 'relative z-10' : ''}>{item}</span>{unavailable && <span className="absolute left-0 top-1/2 h-px w-full -rotate-12 bg-dark-red/70" />}</button>
          })}
        </div>
        <p className="mt-3 flex items-start gap-2 text-xs italic leading-relaxed text-dark-500"><AlertCircle size={14} className="mt-0.5 shrink-0" />FIT oversize. Si prefieres un ajuste más regular, elige una talla menos.</p>
      </div>

      <div className="border-b border-dark-200 py-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-dark-500">Colores</p>
        <div className="flex items-center gap-3">
          {product.colors.map((item) => <button key={item} type="button" onClick={() => setColor(item)} aria-label={`Seleccionar color ${item}`} className={`size-8 cursor-pointer rounded-full border border-dark-300 transition-transform ${color === item ? 'scale-110 ring-2 ring-dark-950 ring-offset-2' : 'hover:scale-105'}`} style={{ backgroundColor: item }} />)}
        </div>
      </div>

      <div className="pt-6">
        <div className="flex gap-3">
          <div className="flex h-12 shrink-0 items-center border border-dark-300">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Disminuir cantidad" className="grid size-11 cursor-pointer place-items-center hover:bg-dark-50"><Minus size={15} /></button>
            <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} aria-label="Aumentar cantidad" className="grid size-11 cursor-pointer place-items-center hover:bg-dark-50"><Plus size={15} /></button>
          </div>
          <button type="button" onClick={() => addToCart(product, { quantity, size: size ?? product.sizes[0], color })} className="flex h-12 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 bg-dark-950 px-4 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-dark-burgundy"><ShoppingBag size={17} />Añadir al carrito</button>
        </div>
        <button type="button" className="mt-3 flex h-12 w-full cursor-pointer items-center justify-center gap-2 border border-dark-300 text-xs font-semibold uppercase tracking-wide text-dark-950 transition-colors hover:border-dark-950"><Heart size={17} />Añadir a favoritos</button>
        <button type="button" className="mt-3 h-12 w-full cursor-pointer bg-dark-950 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-dark-burgundy">Comprar ahora</button>
        <p className="mt-3 text-[11px] text-dark-500">Compra protegida por DARKSHOP.</p>
      </div>
    </section>
  )
}
