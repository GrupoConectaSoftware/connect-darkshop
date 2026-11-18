import { Eye, CheckCircle2, Clock, Truck, XCircle } from "lucide-react";

const statusStyles = {
  "En preparación": [Clock, "bg-blue-50 text-blue-700"],
  "En camino": [Truck, "bg-green-50 text-green-700"],
  Entregados: [CheckCircle2, "bg-green-50 text-green-700"],
  Cancelados: [XCircle, "bg-red-50 text-red-700"],
};

export default function OrderCard({ order, selected, onSelect, onViewDetails }) {
  const [Icon, tone] = statusStyles[order.status] || [Clock, "bg-neutral-100 text-neutral-700"];

  return (
    <article className={`grid w-full grid-cols-2 items-center gap-x-3 gap-y-2 rounded-xl border bg-white p-3 md:grid-cols-[minmax(145px,1fr)_minmax(125px,1fr)_100px_100px] ${selected ? "border-red-500 shadow-sm" : "border-neutral-200"}`}>
      <button
        type="button"
        onClick={() => onSelect(order)}
        aria-pressed={selected}
        aria-label={`Ver seguimiento de la compra ${order.id}`}
        className="col-span-2 grid grid-cols-2 items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-red-700 md:col-span-3 md:grid-cols-[minmax(145px,1fr)_minmax(125px,1fr)_100px]"
      >
        <span>
          <strong className="block text-sm">{order.id}</strong>
          <span className="text-[11px] text-neutral-500">{order.date} · {order.images.length} productos</span>
        </span>
        <span>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold ${tone}`}><Icon size={13}/>{order.status}</span>
          <span className="mt-1 block text-[11px] leading-tight text-neutral-500">{order.status === "Cancelados" ? "Cancelado" : order.status === "Entregados" ? "Entregado" : "Entrega estimada"}<br/>{order.delivery}</span>
        </span>
        <span className="text-xs md:text-right">
          <span className="block text-[10px] text-neutral-500">Total</span>
          <strong className="text-sm">$ {order.total.toLocaleString("es-CO")}</strong>
        </span>
      </button>
      <button
        type="button"
        onClick={() => onViewDetails(order)}
        aria-label={`Ver detalle del pedido ${order.id}`}
        className="col-span-2 flex items-center justify-center gap-2 rounded-md bg-neutral-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-red-700 md:col-span-1"
      >
        <Eye size={16}/> Ver detalle
      </button>
    </article>
  );
}
