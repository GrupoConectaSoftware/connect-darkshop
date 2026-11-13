import { AlertTriangle, Settings, ShieldCheck } from "lucide-react";

export default function InformationComponent() {
  return (
    <section className="flex h-full flex-col rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] sm:p-6" aria-labelledby="security-2fa-title">
      <div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><ShieldCheck size={19} /></span><div><h2 id="security-2fa-title" className="text-sm font-bold sm:text-base">Verificación en dos pasos</h2><p className="text-xs text-neutral-500">Agrega una capa de seguridad extra.</p></div></div><span className="rounded-full bg-neutral-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-neutral-500">No disponible</span></div>
      <div className="my-6 flex flex-1 items-center"><div className="flex w-full items-start gap-3 rounded-lg border border-red-100 bg-red-50 p-4 text-red-900"><AlertTriangle size={20} className="shrink-0" /><div><p className="text-sm font-bold">Protege tu cuenta con 2FA</p><p className="mt-1 text-xs leading-relaxed text-red-900/70">La verificación en dos pasos estará disponible cuando se habilite para tu cuenta.</p></div></div></div>
      <button type="button" disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-neutral-300 px-4 py-3 text-sm font-bold text-neutral-400"><Settings size={16} /> Gestionar 2FA</button>
    </section>
  );
}
