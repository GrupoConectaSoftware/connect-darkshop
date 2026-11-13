export default function KpiCard({ icon: Icon, title, value, detail }) {
  return <div className="flex min-w-0 items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4"><Icon className="shrink-0 text-neutral-800" size={21} /><div className="min-w-0"><p className="text-xs text-neutral-500">{title}</p><p className="mt-1 text-xl font-black text-neutral-950">{value ?? "—"}</p><p className="mt-1 text-[11px] text-neutral-500">{value == null ? "Sin datos en este periodo" : detail}</p></div></div>;
}
