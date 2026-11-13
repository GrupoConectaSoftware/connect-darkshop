import { History } from "lucide-react";

export default function HistoryComponent() {
  return (
    <section className="h-full rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] sm:p-6" aria-labelledby="security-history-title">
      <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><History size={19} /></span><div><h2 id="security-history-title" className="text-sm font-bold sm:text-base">Historial de acceso</h2><p className="text-xs text-neutral-500">Consulta la actividad reciente de tu cuenta.</p></div></div>
      <div className="mt-5 overflow-hidden rounded-lg border border-neutral-100"><div className="grid grid-cols-3 gap-2 bg-neutral-100 px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-neutral-500"><span>Fecha</span><span>Acción</span><span>Dispositivo</span></div><div className="flex min-h-29 items-center justify-center px-5 py-6 text-center text-xs leading-relaxed text-neutral-500">El historial de acceso aún no está disponible.</div></div>
    </section>
  );
}
