import { FileText } from "lucide-react";

const controlClass = "mt-1.5 w-full rounded-lg border border-neutral-200/70 bg-neutral-50 px-3.5 py-3 text-sm text-neutral-600 outline-none transition duration-200 focus:border-red-700 focus:bg-white focus:ring-2 focus:ring-red-700/10";

export default function AdditionalInfoCard() {
  return (
    <section className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-md sm:p-6" aria-labelledby="additional-info-title">
      <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><FileText size={19} strokeWidth={1.7} /></span><div><h2 id="additional-info-title" className="text-sm font-bold sm:text-base">Información adicional</h2><p className="text-xs text-neutral-500">Completa estos datos opcionales para una mejor experiencia.</p></div></div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label className="text-[11px] font-semibold text-neutral-500">Tipo de documento<select className={controlClass} defaultValue=""><option value="">Seleccionar</option><option>Cédula de ciudadanía</option><option>Cédula de extranjería</option><option>Pasaporte</option></select></label>
        <label className="text-[11px] font-semibold text-neutral-500">Número de documento<input className={controlClass} placeholder="Ingresa tu documento" inputMode="numeric" /></label>
        <label className="text-[11px] font-semibold text-neutral-500">Ciudad<select className={controlClass} defaultValue="Cali"><option>Cali</option><option>Bogotá</option><option>Medellín</option><option>Otra ciudad</option></select></label>
        <label className="text-[11px] font-semibold text-neutral-500">Género <span className="font-normal">(opcional)</span><select className={controlClass} defaultValue=""><option value="">Prefiero no decirlo</option><option>Femenino</option><option>Masculino</option><option>No binario</option></select></label>
      </div>
    </section>
  );
}
