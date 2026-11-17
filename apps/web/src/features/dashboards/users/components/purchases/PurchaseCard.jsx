import { CheckCircle2, Clock, Truck, XCircle } from "lucide-react";

const styles = { "En camino": [Truck, "bg-green-50 text-green-700"], Entregada: [CheckCircle2, "bg-blue-50 text-blue-700"], Procesando: [Clock, "bg-neutral-100 text-neutral-700"], Cancelada: [XCircle, "bg-red-50 text-red-700"] };
export default function PurchaseCard({ order, onView }) {
  const [Icon, tone] = styles[order.status];
  return <article className="grid gap-4 border-b border-neutral-100 px-4 py-4 last:border-0 sm:grid-cols-[minmax(150px,1.3fr)_minmax(125px,1fr)_auto] sm:items-center">
    <div><p className="text-xs font-bold">{order.id}</p><p className="mt-1 text-[11px] text-neutral-500">{order.date}</p><div className="mt-2 flex gap-1.5">{order.images.slice(0, 3).map((image, index) => <img key={image} src={image} alt={`Producto ${index + 1} del pedido`} className="size-11 rounded-md bg-neutral-100 object-cover"/>)}{order.images.length > 3 && <span className="grid size-11 place-items-center rounded-md bg-neutral-100 text-xs font-semibold text-neutral-600">+{order.images.length - 3}</span>}</div></div>
    <div><span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold ${tone}`}><Icon size={13}/>{order.status}</span><p className="mt-2 text-[11px] leading-relaxed text-neutral-500">{order.status === "En camino" ? "Entrega estimada" : order.status === "Entregada" ? "Entregado el" : order.status === "Cancelada" ? "Cancelado el" : "Fecha estimada"}<br/><span className="text-neutral-700">{order.delivery}</span></p></div>
    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end"><div><p className="text-[10px] text-neutral-500">Total</p><p className="text-sm font-bold">$ {order.total.toLocaleString("es-CO")}</p></div><button type="button" onClick={() => onView(order)} className="rounded-lg bg-neutral-950 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-red-700">Ver detalles</button></div>
  </article>;
}
