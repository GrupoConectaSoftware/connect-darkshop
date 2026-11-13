import { useMemo, useState } from "react";
import { ShoppingBag, ShoppingCart, Package, ShieldAlert, Clock } from "lucide-react";
import hero from "../../../../assets/Brand/category/categoryUno.webp";
import KpiCard from "../components/reports/KpiCard";
import MonthlySpendChart from "../components/reports/MonthlySpendChart";
import CategoryPieChart from "../components/reports/CategoryPieChart";
import BrandBarChart from "../components/reports/BrandBarChart";
import RecentOrdersTable from "../components/reports/RecentOrdersTable";
import ExportWidget from "../components/reports/ExportWidget";
import RecentActivityTimeline from "../components/reports/RecentActivityTimeline";

const periods = [["30", "Últimos 30 días"], ["90", "Últimos 3 meses"], ["180", "Últimos 6 meses"], ["365", "Último año"], ["custom", "Personalizado"]];
const sampleOrders = [188900, 329800, 179950, 245000, 210000, 198000, 275000, 310000, 165000, 228000, 195000].map((total, index) => ({ id: `#DS-${String(241 - index * 7).padStart(5, '0')}`, iso: `2026-${String(11 - index).padStart(2, '0')}-05`, products: index % 3 + 2, total, status: index === 0 ? "En camino" : "Entregado" }));
const categories = [{ name: "Camisetas", value: 33 }, { name: "Sudaderas", value: 25 }, { name: "Pantalones", value: 17 }, { name: "Zapatos", value: 17 }, { name: "Accesorios", value: 8 }];
const brands = [{ name: "DARK", value: 42 }, { name: "Nike", value: 18 }, { name: "Adidas", value: 15 }, { name: "New Balance", value: 12 }, { name: "Otras", value: 13 }];

export default function ReportsSection() {
  const [period, setPeriod] = useState("365");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const orders = useMemo(() => {
    const reference = new Date('2026-11-13T12:00:00');
    return sampleOrders.map((order) => ({ ...order, date: new Date(`${order.iso}T12:00:00`).toLocaleDateString('es-CO') })).filter((order) => period === 'custom' ? (!from || order.iso >= from) && (!to || order.iso <= to) : (reference - new Date(`${order.iso}T12:00:00`)) / 86400000 <= Number(period));
  }, [period, from, to]);
  const chart = useMemo(() => {
    const grouped = new Map();
    orders.slice().reverse().forEach((order) => { const month = new Date(`${order.iso}T12:00:00`).toLocaleDateString('es-CO', { month: 'short', year: '2-digit' }); grouped.set(month, (grouped.get(month) || 0) + order.total); });
    return Array.from(grouped, ([month, amount]) => ({ month, amount }));
  }, [orders]);
  const total = orders.reduce((sum, order) => sum + order.total, 0);
  const count = orders.reduce((sum, order) => sum + order.products, 0);
  const activity = orders.map((order) => ({ title: "Realizaste un pedido", detail: `${order.id} · ${order.date}` }));
  const banDate = '2026-06-05';
  const banCount = period === 'custom' ? Number((!from || banDate >= from) && (!to || banDate <= to)) : Number((new Date('2026-11-13T12:00:00') - new Date(`${banDate}T12:00:00`)) / 86400000 <= Number(period));

  return <div className="min-h-screen bg-[#f6f7f8] pb-10">
    <header className="relative isolate flex min-h-52 items-center overflow-hidden bg-neutral-200"><img src={hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80" /><div className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/80 to-transparent" /><div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10"><p className="text-[10px] font-bold tracking-[.2em] text-neutral-600">MI CUENTA <span className="mx-2 text-red-700">/</span> RESUMEN</p><h1 className="mt-2 font-display text-4xl font-black text-neutral-900 sm:text-5xl">Resumen</h1><p className="mt-2 max-w-lg text-sm text-neutral-600">Revisa el resumen de tu actividad, compras y gastos en DarkShop.</p></div></header>
    <div className="relative mx-auto -mt-7 max-w-[1600px] px-4 sm:px-6 lg:px-10"><div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3">{periods.map(([value, label]) => <button key={value} type="button" onClick={() => setPeriod(value)} aria-pressed={period === value} className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${period === value ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>{label}</button>)}{period === 'custom' && <div className="flex flex-wrap gap-2"><input type="date" aria-label="Desde" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border border-neutral-200 px-2 py-1.5 text-xs" /><input type="date" aria-label="Hasta" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border border-neutral-200 px-2 py-1.5 text-xs" /></div>}<span className="ml-auto text-[10px] text-neutral-400">Datos de muestra · enero–noviembre 2026</span></div>
      <div className="grid gap-4 lg:grid-cols-3"><div className="min-w-0 space-y-4 lg:col-span-2"><div className="grid grid-cols-2 gap-3 xl:grid-cols-4"><KpiCard icon={ShoppingBag} title="Total en compras" value={orders.length ? `$ ${total.toLocaleString('es-CO')}` : null} detail="En este periodo" /><KpiCard icon={ShoppingCart} title="Pedidos realizados" value={orders.length || null} detail="En este periodo" /><KpiCard icon={Package} title="Productos comprados" value={count || null} detail="En este periodo" /><KpiCard icon={ShieldAlert} title="Baneos" value={banCount} detail="Reportes en este periodo" /></div><MonthlySpendChart data={chart} /><div className="grid gap-4 md:grid-cols-2"><CategoryPieChart data={orders.length ? categories : []} /><BrandBarChart data={orders.length ? brands : []} /></div><RecentOrdersTable data={orders} /></div><aside className="flex min-w-0 flex-col gap-4"><ExportWidget data={orders} /><section className="rounded-xl border border-neutral-200 bg-white p-5"><div className="flex items-center gap-3"><Clock size={21} /><div><h2 className="font-bold">Resumen rápido</h2><p className="text-xs text-neutral-500">Información de tu actividad.</p></div></div><div className="mt-4 space-y-3 text-xs text-neutral-600"><p className="flex justify-between gap-3 border-b border-neutral-100 pb-3"><span>Último pedido</span><strong className="text-neutral-900">{orders[0]?.id || 'Sin pedidos'}</strong></p><p className="flex justify-between gap-3 border-b border-neutral-100 pb-3"><span>Categoría destacada</span><strong className="text-neutral-900">{orders.length ? 'Camisetas' : '—'}</strong></p><p className="flex justify-between gap-3"><span>Marca destacada</span><strong className="text-neutral-900">{orders.length ? 'DARK' : '—'}</strong></p></div></section><div className="flex min-h-0 flex-1 flex-col"><RecentActivityTimeline data={activity} /></div></aside></div>
    </div>
  </div>;
}


