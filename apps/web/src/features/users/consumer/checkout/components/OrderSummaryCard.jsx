import { MapPin, Package } from 'lucide-react'
import { productsData } from '../../../../../data/products'

const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
export default function OrderSummaryCard() {
  const items = productsData.slice(0, 3)
  const total = items.reduce((sum, item) => sum + item.price, 0) + 15000
  return <section className="mb-6 rounded-2xl bg-gray-50 p-4"><div className="flex items-center justify-between"><span className="flex items-center gap-2 text-xs font-bold text-gray-900"><Package size={15}/> Pedido #DS-00241</span><span className="text-xs text-gray-500">3 productos</span></div><div className="mt-3 flex -space-x-2">{items.map((item) => <img key={item.id} src={item.image} alt={item.name} className="size-12 rounded-lg border-2 border-gray-50 object-cover"/>)}</div><div className="mt-4 flex items-end justify-between border-t border-gray-200 pt-3"><span className="flex max-w-[65%] gap-1 text-xs leading-relaxed text-gray-500"><MapPin className="mt-0.5 size-3.5 shrink-0"/>Cra. 80 # 44-32, Cali, Colombia</span><span className="text-sm font-black text-gray-950">{money.format(total)}</span></div></section>
}
