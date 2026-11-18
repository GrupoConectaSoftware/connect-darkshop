import { useEffect, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Search,
  Send,
  Truck,
  X,
} from "lucide-react";
import { products } from "../../../../../data/dashboardData.js";

const formatPrice = (value) => `$ ${Number(value || 0).toLocaleString("es-CO")}`;

function Dialog({ title, eyebrow, onClose, children, wide = false }) {
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/65 p-4 backdrop-blur-sm"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-h-[90vh] w-full overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl ${wide ? "max-w-4xl" : "max-w-xl"}`}
      >
        <header className="flex items-start justify-between border-b border-neutral-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-red-700">{eyebrow}</p>
            <h2 className="mt-1 text-xl font-bold text-neutral-950">{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-red-700">
            <X size={18} />
          </button>
        </header>
        <div className="max-h-[calc(90vh-76px)] overflow-y-auto p-5 [scrollbar-width:thin] [scrollbar-color:#b91c1c_transparent] sm:p-6">{children}</div>
      </section>
    </div>
  );
}

function OrderDetails({ order, items }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Compra", order.id],
          ["Fecha", order.date],
          ["Estado", order.status],
          ["Total", formatPrice(order.total)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-neutral-50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500">{label}</p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">{value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bold text-neutral-900">Productos de la compra</h3>
          <span className="text-xs text-neutral-500">{items.length} {items.length === 1 ? "producto" : "productos"}</span>
        </div>
        <div className="divide-y divide-neutral-100 rounded-xl border border-neutral-200">
          {items.map((item, index) => (
            <article key={`${item.id}-${index}`} className="flex items-center gap-3 p-3">
              <img src={item.image} alt={item.name} className="h-16 w-14 shrink-0 rounded-lg bg-neutral-100 object-cover object-top" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-neutral-950">{item.name}</p>
                <p className="mt-1 text-xs text-neutral-500">Tienda: {item.brand || "DARK"}</p>
                <p className="text-xs text-neutral-500">Cantidad: 1</p>
              </div>
              <strong className="shrink-0 text-sm">{formatPrice(item.price)}</strong>
            </article>
          ))}
          {!items.length && <p className="p-4 text-sm text-neutral-500">El detalle de productos no está disponible.</p>}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Envío</p>
          <p className="mt-2 text-sm font-semibold">{order.carrier}</p>
          <p className="mt-1 text-xs text-neutral-600">Guía {order.guide}</p>
          <p className="mt-2 text-xs leading-relaxed text-neutral-600">{order.address}</p>
          <p className="mt-2 text-xs text-neutral-600">Método de pago: {order.paymentMethod || 'No especificado'}</p>
        </div>
        <div className="rounded-xl bg-neutral-950 p-4 text-white">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/55">Resumen de pago</p>
          <div className="mt-3 flex justify-between gap-3 text-sm text-white/75"><span>Productos</span><span>{formatPrice(order.total)}</span></div>
          <div className="mt-2 flex justify-between gap-3 border-t border-white/15 pt-3 text-base font-bold"><span>Total pagado</span><span>{formatPrice(order.total)}</span></div>
        </div>
      </div>
    </div>
  );
}

export function OrderDetailsModal({ order, onClose }) {
  const items = (order?.images || []).map((image) => products.find((product) => product.image === image)).filter(Boolean);
  if (!order) return null;
  return <Dialog title="Detalle completo de la compra" eyebrow={order.id} onClose={onClose} wide><OrderDetails order={order} items={items} /></Dialog>;
}

export default function TrackingSidebarComponent({ order, orders = [], onSelect }) {
  const [dialog, setDialog] = useState(null);
  const [guideQuery, setGuideQuery] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [reportSent, setReportSent] = useState(false);

  if (!order) return <aside className="flex h-full items-center justify-center rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-500">Selecciona una compra para consultar su seguimiento.</aside>;

  const currentStep = order.status === "Entregados" ? 4 : order.status === "En camino" ? 3 : order.status === "En preparación" ? 1 : 0;
  const steps = [
    { label: "Compra confirmada", detail: order.date, Icon: CheckCircle2 },
    { label: "Preparando compra", detail: "La tienda está alistando tus productos", Icon: Package },
    { label: "En manos de la transportadora", detail: order.carrier, Icon: Truck },
    { label: "En camino", detail: order.delivery ? `Entrega estimada: ${order.delivery}` : "En tránsito", Icon: MapPin },
    { label: "Compra entregada", detail: order.delivery, Icon: Check },
  ];

  const lookupGuide = (event) => {
    event.preventDefault();
    const normalized = guideQuery.trim().toLowerCase();
    const match = orders.find((candidate) => candidate.guide.toLowerCase() === normalized || candidate.id.toLowerCase() === normalized);
    if (match) {
      onSelect?.(match);
      setLookupMessage(`Seguimiento actualizado para ${match.id}.`);
      setGuideQuery("");
      return;
    }
    setLookupMessage("No encontramos esa guía. Revisa el número e inténtalo de nuevo.");
  };

  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(order.address || "Cali, Colombia")}&output=embed`;

  return (
    <>
      <aside className="flex h-full min-h-[570px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex items-start justify-between gap-3 border-b border-neutral-100 px-4 py-4 sm:px-5">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-neutral-100 p-2 text-neutral-950"><Package size={20} /></span>
            <div>
              <h2 className="text-sm font-bold text-neutral-950">Seguimiento de la compra</h2>
              <p className="mt-1 text-[11px] text-neutral-500">{order.id} <span className="mx-1">·</span> realizada el {order.date}</p>
            </div>
          </div>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${order.status === "Cancelados" ? "bg-red-50 text-red-700" : order.status === "Entregados" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"}`}>{order.status}</span>
        </div>

        <div className="relative min-h-0 flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5">
          <ol className="relative space-y-4 before:absolute before:bottom-5 before:left-[11px] before:top-3 before:w-px before:bg-neutral-200">
            {steps.map(({ label, detail, Icon }, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;
              return (
                <li key={label} className="relative flex gap-3">
                  <span className={`relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${completed ? "border-neutral-950 bg-neutral-950 text-white" : active ? "border-red-700 bg-red-700 text-white ring-4 ring-red-100" : "border-neutral-200 bg-white text-neutral-400"}`}>
                    {completed ? <Check size={13} /> : <Icon size={12} />}
                  </span>
                  <div className="min-w-0 pb-1">
                    <p className={`text-xs font-bold ${active ? "text-red-700" : completed ? "text-neutral-900" : "text-neutral-500"}`}>{label}</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{detail}</p>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-neutral-50 p-3">
            <div className="flex min-w-0 items-center gap-2"><Truck size={17} className="shrink-0 text-neutral-700"/><div className="min-w-0"><p className="text-[10px] text-neutral-500">Transportadora</p><p className="truncate text-xs font-semibold">{order.carrier}</p></div></div>
            <div className="flex min-w-0 items-center gap-2 border-l border-neutral-200 pl-3"><Package size={16} className="shrink-0 text-neutral-700"/><div className="min-w-0"><p className="text-[10px] text-neutral-500">Número de guía</p><p className="truncate text-xs font-semibold">{order.guide}</p></div></div>
          </div>

          <div className="mt-2 flex items-start gap-2 rounded-xl border border-neutral-200 p-3"><MapPin size={17} className="mt-0.5 shrink-0 text-red-700"/><div><p className="text-[10px] text-neutral-500">Dirección de entrega</p><p className="text-xs leading-relaxed text-neutral-800">{order.address}</p></div></div>

          <form onSubmit={lookupGuide} className="mt-3 rounded-xl border border-neutral-200 p-3">
            <label htmlFor="tracking-guide" className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-neutral-600">Consultar otra guía o compra</label>
            <div className="flex gap-2">
              <input id="tracking-guide" value={guideQuery} onChange={(event) => { setGuideQuery(event.target.value); setLookupMessage(""); }} placeholder="Número de guía o compra" className="min-w-0 flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-xs outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100" />
              <button type="submit" aria-label="Consultar seguimiento" className="grid w-10 shrink-0 place-items-center rounded-lg bg-neutral-950 text-white transition hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-red-700"><Search size={15} /></button>
            </div>
            {lookupMessage && <p aria-live="polite" className="mt-2 text-[11px] text-neutral-600">{lookupMessage}</p>}
          </form>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-neutral-100 p-3 sm:p-4">
          <button type="button" onClick={() => setDialog("map")} className="flex items-center justify-center gap-2 rounded-lg bg-neutral-950 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-red-700"><MapPin size={15} /> Ver mapa</button>
          <button type="button" onClick={() => { setReportSent(false); setDialog("report"); }} className="flex items-center justify-center gap-2 rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-bold text-neutral-800 transition hover:border-red-300 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700"><AlertCircle size={15} /> Reportar compra</button>
        </div>
      </aside>

      {dialog === "map" && <Dialog title="Mapa y seguimiento" eyebrow={`Guía ${order.guide}`} onClose={() => setDialog(null)} wide>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
            <iframe title={`Mapa de entrega de ${order.id}`} src={mapUrl} className="h-72 w-full border-0 sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="flex flex-col rounded-xl bg-neutral-950 p-5 text-white">
            <div className="flex items-center gap-2 text-red-400"><Truck size={18} /><span className="text-xs font-bold uppercase tracking-wider">Estado del envío</span></div>
            <p className="mt-3 text-xl font-bold">{order.status}</p>
            <p className="mt-1 text-sm text-white/65">{order.carrier}</p>
            <div className="mt-5 space-y-3 border-t border-white/15 pt-4 text-sm">
              <div className="flex justify-between gap-3"><span className="text-white/55">Guía</span><strong>{order.guide}</strong></div>
              <div className="flex justify-between gap-3"><span className="text-white/55">Compra</span><strong>{order.id}</strong></div>
              <div><span className="text-white/55">Destino</span><p className="mt-1 leading-relaxed">{order.address}</p></div>
              <div className="flex items-center gap-2 text-white/65"><Clock3 size={14} />Entrega estimada: {order.delivery}</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">El mapa muestra la dirección de entrega. Para novedades en tiempo real del transportador, consulta su servicio con el número de guía.</p>
      </Dialog>}

      {dialog === "report" && <Dialog title={reportSent ? "Reporte recibido" : "Reportar un problema"} eyebrow={`Compra ${order.id}`} onClose={() => setDialog(null)}>
        {reportSent ? (
          <div className="py-5 text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 size={28} /></span><h3 className="mt-4 text-lg font-bold">Ya registramos tu reporte</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-neutral-600">Guardamos la novedad sobre la compra {order.id}. El equipo de soporte podrá revisar el motivo y los detalles que compartiste.</p><button type="button" onClick={() => setDialog(null)} className="mt-5 rounded-lg bg-neutral-950 px-6 py-3 text-xs font-bold text-white transition hover:bg-neutral-800">Listo</button></div>
        ) : (
          <form onSubmit={(event) => { event.preventDefault(); setReportSent(true); }} className="space-y-4">
            <p className="text-sm leading-relaxed text-neutral-600">Cuéntanos qué ocurrió con esta compra para dejar el caso asociado a su número y seguimiento.</p>
            <label className="block text-xs font-semibold text-neutral-700">Motivo del reporte
              <select required value={reportReason} onChange={(event) => setReportReason(event.target.value)} className="mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100">
                <option value="">Selecciona un motivo</option><option>El producto no llegó</option><option>Recibí un producto diferente</option><option>Producto con daño o defecto</option><option>Demora en la entrega</option><option>Problema con el cobro</option><option>Otro motivo</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-neutral-700">Detalles
              <textarea required minLength={8} rows={4} value={reportDescription} onChange={(event) => setReportDescription(event.target.value)} placeholder="Describe brevemente lo sucedido…" className="mt-2 w-full resize-y rounded-lg border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100" />
            </label>
            <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-4">
              <span className="text-[11px] text-neutral-500">Compra {order.id} · Guía {order.guide}</span>
              <button type="submit" className="flex items-center gap-2 rounded-lg bg-red-700 px-4 py-3 text-xs font-bold text-white transition hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"><Send size={14} /> Enviar reporte</button>
            </div>
          </form>
        )}
      </Dialog>}
    </>
  );
}
