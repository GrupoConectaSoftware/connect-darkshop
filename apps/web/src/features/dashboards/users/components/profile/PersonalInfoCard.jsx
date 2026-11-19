import { UserRound } from "lucide-react";

const fieldClass = "mt-1.5 w-full rounded-lg border border-neutral-200/70 bg-neutral-50 px-3.5 py-3 text-sm font-medium text-neutral-700 outline-none transition duration-200 placeholder:text-neutral-400 focus:border-red-700 focus:bg-white focus:ring-2 focus:ring-red-700/10";

export default function PersonalInfoCard() {
  return (
    <section className="h-full min-h-60 rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white p-5 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md sm:p-6 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]" aria-labelledby="personal-info-title">
      <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><UserRound size={19} strokeWidth={1.7} /></span><div><h2 id="personal-info-title" className="text-sm font-bold sm:text-base">Información personal</h2><p className="text-xs text-neutral-500 dark:text-gray-400">Revisa y actualiza tus datos de contacto.</p></div></div>
      <form className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-[11px] font-semibold text-neutral-500 dark:text-gray-400">Nombre completo<input className={fieldClass} defaultValue="Alejandro Aguilón Buitrago" autoComplete="name" /></label>
        <label className="text-[11px] font-semibold text-neutral-500 dark:text-gray-400">Correo electrónico<input className={fieldClass} type="email" defaultValue="alejandro@correo.com" autoComplete="email" /></label>
        <label className="text-[11px] font-semibold text-neutral-500 dark:text-gray-400">Teléfono<div className="mt-1.5 flex overflow-hidden rounded-lg bg-neutral-100 focus-within:ring-2 focus-within:ring-red-700/15 dark:bg-[#27272a]"><span className="flex items-center gap-2 border-r border-neutral-200 dark:border-neutral-700 px-3 text-sm text-neutral-600 dark:text-neutral-300 dark:border-[#2a2a2d]"><span aria-hidden="true">🇨🇴</span> +57</span><input className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 outline-none" type="tel" defaultValue="300 123 4567" autoComplete="tel" /></div></label>
        <label className="text-[11px] font-semibold text-neutral-500 dark:text-gray-400">Fecha de nacimiento <span className="font-normal">(opcional)</span><input className={fieldClass} type="date" /></label>
      </form>
    </section>
  );
}
