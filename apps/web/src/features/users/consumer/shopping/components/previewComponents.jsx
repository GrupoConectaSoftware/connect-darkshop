import { Minus, Plus, ReceiptText, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

function CartItem({ item, onQuantityChange, onRemove }) {
  const badgeClass = item.badge === 'discount' ? 'bg-dark-burgundy' : 'bg-dark-950'
  const badgeLabel = item.badge === 'discount' ? 'Descuento' : 'Recomendado'

  return (
    <article className="relative grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border border-dark-200 bg-dark-white p-4 shadow-sm sm:grid-cols-[8.5rem_minmax(0,1fr)_auto_auto] sm:items-center sm:gap-6 sm:p-5">
      {item.badge && <span className={`absolute right-3 top-0 -translate-y-1/2 -rotate-2 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-dark-white ${badgeClass}`}>{badgeLabel}</span>}
      <img src={item.image} alt={item.name} loading="lazy" className="aspect-square h-full w-full bg-dark-100 object-cover object-top" />

      <div className="min-w-0 self-center pr-7 sm:pr-0">
        <h2 className="line-clamp-2 text-xs font-bold uppercase leading-tight text-dark-950 sm:text-sm">{item.name}</h2>
        <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-dark-500 sm:text-xs">{item.description}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-dark-500 sm:text-[11px]">
          <span>Talla: <strong className="font-semibold text-dark-950">{item.size}</strong></span>
          <span>Precio unitario: <strong className="font-semibold text-dark-950">{money.format(item.price)}</strong></span>
          <span className="inline-flex items-center gap-1">Color: <i aria-label={`Color ${item.colorName}`} className={`size-3 rounded-full border border-dark-300 ${item.colorClass}`} /></span>
        </div>
        <p className="mt-1 text-[10px] text-dark-500 sm:text-[11px]">Tienda: <strong className="font-semibold text-dark-950">{item.store.name}</strong></p>
        <p className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-green-700 sm:text-[11px]"><span className="size-2 rounded-full bg-green-700" />{item.inStock ? 'En stock' : 'Sin stock'}</p>
      </div>

      <div className="col-start-2 flex items-center justify-between gap-3 sm:col-start-auto sm:justify-center">
        <div className="flex h-10 items-center border border-dark-300 text-sm">
          <button type="button" onClick={() => onQuantityChange(item.id, item.quantity - 1)} aria-label={`Disminuir cantidad de ${item.name}`} className="grid size-9 cursor-pointer place-items-center text-dark-600 transition-colors hover:bg-dark-50 hover:text-dark-950"><Minus size={14} /></button>
          <span className="w-8 text-center text-xs font-medium text-dark-700">{String(item.quantity).padStart(2, '0')}</span>
          <button type="button" onClick={() => onQuantityChange(item.id, item.quantity + 1)} aria-label={`Aumentar cantidad de ${item.name}`} className="grid size-9 cursor-pointer place-items-center text-dark-600 transition-colors hover:bg-dark-50 hover:text-dark-950"><Plus size={14} /></button>
        </div>
        <strong className="text-base font-black tracking-tight text-dark-950 sm:hidden">{money.format(item.price * item.quantity)}</strong>
      </div>

      <strong className="hidden whitespace-nowrap text-lg font-black tracking-tight text-dark-950 sm:block">{money.format(item.price * item.quantity)}</strong>
      <button type="button" onClick={() => onRemove(item.id)} aria-label="Eliminar producto" className="absolute right-3 top-3 grid size-8 cursor-pointer place-items-center text-dark-400 transition-colors hover:text-dark-red sm:relative sm:right-auto sm:top-auto"><X size={19} strokeWidth={1.5} /></button>
    </article>
  )
}

export default function PreviewComponents({ items, onQuantityChange, onRemove }) {
  if (items.length === 0) {
    return (
      <div className="relative flex min-h-64 flex-1 flex-col items-center justify-center overflow-hidden border border-dashed border-dark-300 bg-dark-50/60 px-6 py-10 text-center lg:min-h-0">
        <span aria-hidden="true" className="absolute inset-x-5 top-4 border-t border-dashed border-dark-300" />
        <span aria-hidden="true" className="absolute inset-x-5 bottom-4 border-t border-dashed border-dark-300" />
        <ReceiptText aria-hidden="true" size={42} strokeWidth={1.2} className="text-dark-400" />
        <h2 className="mt-5 font-display text-xl uppercase tracking-wide text-dark-800">Ticket vacío</h2>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-dark-500">Todavía no tienes productos en tu canasta.</p>
        <Link to="/catalog" className="mt-5 inline-flex h-10 items-center justify-center bg-dark-950 px-5 text-xs font-semibold uppercase tracking-wide text-dark-white transition-colors hover:bg-dark-burgundy">Explorar productos</Link>
      </div>
    )
  }

  return (
    <section aria-label="Productos en el carrito" className="max-h-[60vh] space-y-4 overflow-x-hidden overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item) => <CartItem key={item.id} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />)}
    </section>
  )
}
