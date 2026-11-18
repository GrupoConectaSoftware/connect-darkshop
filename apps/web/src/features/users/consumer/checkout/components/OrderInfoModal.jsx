import { useEffect } from 'react'
import { MapPin, Package, X } from 'lucide-react'

export default function OrderInfoModal({
  isOpen,
  onClose,
  items = [],
  shipping = 0,
  total = 0,
  money,
  address = 'Cali, Colombia',
}) {
  const seller = items[0]?.brand || items[0]?.store || 'DARK'
  const colorName = (item) => {
    const color = item.colorName || item.selectedColorName || item.selectedColor || item.colors?.[0]
    if (!color) return 'Negro'
    const knownColors = {
      '#080808': 'Negro',
      '#121212': 'Negro',
      '#f5f5f3': 'Blanco',
      '#d9d9d9': 'Gris',
      '#333333': 'Gris oscuro',
      '#491c25': 'Rojo vino',
      '#1f3653': 'Azul',
    }
    return knownColors[String(color).toLowerCase()] || color
  }

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-info-title"
        className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        <header className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-600">DarkShop</p>
            <h2 id="order-info-title" className="mt-1 text-xl font-bold text-gray-950">Detalles del pedido</h2>
            <p className="mt-1 text-sm text-gray-500">Pedido #DS-00241</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalles"
            className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Package size={16} aria-hidden="true" />
            <span>Productos ({items.length})</span>
          </div>
          {items.length ? items.map((item, index) => (
            <article key={item.id ?? `${item.name}-${index}`} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-12 w-12 shrink-0 rounded object-cover" />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-400"><Package size={18} /></div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">{item.name}</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Talla: {item.size || item.selectedSize || 'M'} · Color: {colorName(item)}
                </p>
              </div>
              <span className="shrink-0 text-sm font-bold text-gray-950">{money?.format(item.price ?? 0)}</span>
            </article>
          )) : (
            <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">No hay productos en este pedido.</p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 p-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-xs font-black text-white">
            {seller.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <p className="text-xs text-gray-500">Vendido por</p>
            <p className="text-sm font-semibold text-gray-900">{seller}</p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Entrega</p>
          <p className="mt-2 flex items-start gap-2 text-sm text-gray-700"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{address}</p>
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-sm text-gray-600">
            <span>Costo de envío</span><span>{money?.format(shipping)}</span>
          </div>
          <div className="mt-2 flex justify-between text-base font-black text-gray-950">
            <span>Total del pedido</span><span>{money?.format(total)}</span>
          </div>
        </div>

        <footer className="mt-5 flex justify-end">
          <button type="button" onClick={onClose} className="rounded-lg bg-black px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2">
            Cerrar
          </button>
        </footer>
      </section>
    </div>
  )
}
