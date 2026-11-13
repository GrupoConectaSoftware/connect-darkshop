import { useMemo, useState } from "react";
import { Copy, Eye, Printer, ShieldAlert, X } from "lucide-react";

const tones = { "En revisión": "bg-amber-50 text-amber-700", Resuelto: "bg-green-50 text-green-700", Sancionado: "bg-red-50 text-red-700", Descartado: "bg-neutral-100 text-neutral-600" };
const tabs = [["Todos", null], ["En revisión", "En revisión"], ["Resueltos", "Resuelto"], ["Sancionados", "Sancionado"], ["Descartados", "Descartado"]];

export default function BansTableComponent({ reports }) {
  const [tab, setTab] = useState(null);
  const [type, setType] = useState("Todos");
  const [reason, setReason] = useState("Todos");
  const [date, setDate] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");
  const reportText = (r) => `Reporte ${r.id}\nUsuario: ${r.user}\nTipo: ${r.type}\nMotivo: ${r.reason}\nContenido: ${r.content}\nFecha: ${r.date}\nEstado: ${r.status}`;
  const copyReport = async (report) => {
    try { await navigator.clipboard.writeText(reportText(report)); setNotice(`Datos del reporte ${report.id} copiados.`); }
    catch { setNotice("No se pudo copiar el reporte. Revisa los permisos del navegador."); }
  };
  const printReport = (report) => {
    const popup = window.open("", "_blank", "width=700,height=600");
    if (!popup) { setNotice("Permite las ventanas emergentes para imprimir el reporte."); return; }
    popup.document.title = `Reporte ${report.id}`;
    const content = popup.document.createElement("pre");
    content.textContent = reportText(report);
    popup.document.body.appendChild(content);
    popup.print();
  };
  const filtered = useMemo(() => reports.filter((r) => (!tab || r.status === tab) && (type === "Todos" || r.type === type) && (reason === "Todos" || r.reason === reason) && (date === "Todos" || r.date.startsWith(date))), [reports, tab, type, reason, date]);
  const selects = [["Tipo de reporte", type, setType, [...new Set(reports.map((r) => r.type))]], ["Motivo", reason, setReason, [...new Set(reports.map((r) => r.reason))]], ["Fecha", date, setDate, [...new Set(reports.map((r) => r.date.slice(0, 7)))]]];
  return <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
    <div className="flex shrink-0 gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{tabs.map(([label, value]) => <button key={label} type="button" onClick={() => setTab(value)} aria-pressed={tab === value} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${tab === value ? "bg-neutral-950 text-white" : "bg-neutral-100 text-neutral-600"}`}>{label} ({value ? reports.filter((r) => r.status === value).length : reports.length})</button>)}</div>
    <div className="my-4 grid shrink-0 grid-cols-1 gap-3 sm:grid-cols-3">{selects.map(([label, value, setter, options]) => <label key={label} className="text-[11px] font-medium text-neutral-500">{label}<select value={value} onChange={(event) => setter(event.target.value)} className="mt-1 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-800"><option value="Todos">Todos</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>)}</div>
    <div tabIndex={0} aria-label="Lista de reportes de baneos" className="min-h-0 flex-1 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{filtered.length ? <table className="w-full min-w-[900px] text-left text-xs"><thead className="sticky top-0 z-10 bg-neutral-100 text-[10px] uppercase text-neutral-600"><tr>{["#", "Usuario reportado", "Tipo", "Motivo", "Contenido", "Fecha", "Estado", "Acciones"].map((h) => <th key={h} className="px-3 py-3 font-bold">{h}</th>)}</tr></thead><tbody>{filtered.map((r) => <tr key={r.id} className="border-b border-neutral-100 last:border-0"><td className="px-3 py-4 font-bold">{r.id}</td><td className="px-3 py-4"><span className="font-semibold">{r.user}</span><span className="block text-[10px] text-neutral-400">{r.account}</span></td><td className="px-3 py-4">{r.type}</td><td className="px-3 py-4">{r.reason}</td><td className="max-w-48 px-3 py-4 text-neutral-600">{r.content}</td><td className="whitespace-nowrap px-3 py-4 text-neutral-500">{r.date}</td><td className="px-3 py-4"><span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${tones[r.status]}`}>{r.status}</span></td><td className="px-2 py-4"><div className="flex items-center gap-1">{[[Eye, "Ver", () => setSelected(r)], [Copy, "Copiar", () => copyReport(r)], [Printer, "Imprimir", () => printReport(r)]].map(([Icon, label, action]) => <button key={label} type="button" onClick={action} aria-label={`${label} reporte ${r.id}`} title={`${label} reporte`} className="grid size-8 place-items-center rounded-lg text-neutral-500 transition-colors hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-700"><Icon size={16}/></button>)}</div></td></tr>)}</tbody></table> : <div className="flex min-h-48 flex-col items-center justify-center text-center text-neutral-400"><ShieldAlert size={26}/><p className="mt-3 text-sm">No hay reportes de baneos para mostrar</p></div>}</div>
    {notice && <p role="status" className="mt-3 text-xs text-neutral-600">{notice}</p>}
    {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}><div role="dialog" aria-modal="true" aria-labelledby="report-title" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => { if (event.key === "Escape") setSelected(null); }} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-widest text-red-700">Detalle del reporte</p><h2 id="report-title" className="mt-1 text-xl font-bold">Reporte {selected.id}</h2></div><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Cerrar detalle" className="rounded-lg p-2 text-neutral-500 hover:text-red-700"><X size={20}/></button></div><dl className="mt-5 space-y-3 text-sm">{[["Usuario", selected.user], ["Tipo", selected.type], ["Motivo", selected.reason], ["Contenido", selected.content], ["Fecha", selected.date], ["Estado", selected.status]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 border-b border-neutral-100 pb-3"><dt className="text-neutral-500">{label}</dt><dd className="text-right font-medium">{value}</dd></div>)}</dl></div></div>}
  </section>;
}
