import { BadgeCheck, Box, CreditCard, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const money = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const GUARANTEES = [
  { icon: Box, title: 'Cambios y devoluciones', description: 'Sin complicaciones' },
  { icon: ShieldCheck, title: 'Pagos seguros', description: 'Compra con confianza' },
  { icon: BadgeCheck, title: 'Calidad garantizada', description: 'Hecha para durar' },
]

export default function CalculateComponent({ items }) {
  const navigate = useNavigate()
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0
  const discount = 0
  const total = subtotal - discount + shipping
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <aside className="lg:sticky lg:top-28" aria-label="Resumen del pedido">
      <div className="border-y border-dark-200 py-5 sm:px-1">
        <h2 className="text-sm font-bold text-dark-950">Resumen del pedido</h2>
        <dl className="mt-5 space-y-4 text-sm">
          <div className="flex items-center justify-between gap-4"><dt className="text-dark-500">Subtotal ({itemCount} productos)</dt><dd className="font-semibold text-dark-950">{money.format(subtotal)}</dd></div>
          <div className="flex items-center justify-between gap-4"><dt className="text-dark-500">Descuento</dt><dd className="font-semibold text-dark-950">-{money.format(discount)}</dd></div>
          <div className="flex items-center justify-between gap-4"><dt className="inline-flex items-center gap-1 text-dark-500">Envío <span className="size-1.5 rounded-full bg-dark-950" /></dt><dd className="font-semibold text-dark-950">{money.format(shipping)}</dd></div>
        </dl>
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-dark-300 py-5"><span className="text-lg text-dark-500">Total estimado</span><strong className="text-xl font-black tracking-tight text-dark-950">{money.format(total)}</strong></div>

      <button type="button" onClick={() => navigate('/checkout')} disabled={!items.length} className="mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 bg-dark-950 px-4 text-xs font-semibold uppercase tracking-wide text-dark-white transition-colors hover:bg-dark-burgundy disabled:cursor-not-allowed disabled:bg-dark-300"><CreditCard size={17} />Continuar con el pago</button>
      <p className="mt-2 text-[10px] italic text-dark-400">Venta protegida por Wompi</p>

      <div className="mt-6 space-y-3">
        {GUARANTEES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-center gap-4 border border-dark-300 px-4 py-4">
            <Icon size={30} strokeWidth={1.5} className="shrink-0 text-dark-800" />
            <span><strong className="block text-xs font-bold uppercase tracking-wide text-dark-950">{title}</strong><span className="mt-1 block text-[11px] text-dark-500">{description}</span></span>
          </div>
        ))}
      </div>
    </aside>
  )
}
