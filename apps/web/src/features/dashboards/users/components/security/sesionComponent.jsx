import { Monitor, Smartphone, UserRound } from "lucide-react";

export default function SessionComponent() {
  return (
    <section className="h-full rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] sm:p-6" aria-labelledby="security-sessions-title">
      <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><UserRound size={19} /></span><div><h2 id="security-sessions-title" className="text-sm font-bold sm:text-base">Sesiones activas</h2><p className="text-xs text-neutral-500">Dispositivos donde has iniciado sesión.</p></div></div>
      <div className="mt-5 flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-5 py-8 text-center"><div className="flex items-center gap-3 text-neutral-400"><Monitor size={21} /><Smartphone size={19} /></div><p className="mt-3 text-sm font-semibold text-neutral-700">Dispositivos no disponibles</p><p className="mt-1 max-w-xs text-xs leading-relaxed text-neutral-500">Aquí podrás consultar tus sesiones cuando el servicio esté disponible.</p></div>
    </section>
  );
}
