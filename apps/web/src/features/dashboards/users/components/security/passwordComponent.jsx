import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock } from "lucide-react";
import PasswordValidation from "../../../../../components/ui/forms/PasswordValidation";

const fields = [
  ["current", "Contraseña actual", "current-password"],
  ["next", "Nueva contraseña", "new-password"],
  ["confirm", "Confirmar nueva contraseña", "new-password"],
];

export default function PasswordComponent() {
  const [visible, setVisible] = useState({});
  const [password, setPassword] = useState("");
  return (
    <section className="h-full rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] sm:p-6" aria-labelledby="security-password-title">
      <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><Lock size={19} /></span><div><h2 id="security-password-title" className="text-sm font-bold sm:text-base">Cambiar contraseña</h2><p className="text-xs text-neutral-500">Actualiza tu contraseña para proteger tu cuenta.</p></div></div>
      <div className="mt-5 space-y-3">
        {fields.map(([id, label, autocomplete]) => <label key={id} className="relative flex items-center rounded-lg border border-neutral-200/70 bg-neutral-50 focus-within:border-red-700 focus-within:ring-2 focus-within:ring-red-700/10"><Lock size={16} className="ml-4 shrink-0 text-neutral-400" /><input type={visible[id] ? "text" : "password"} aria-label={label} placeholder={label} autoComplete={autocomplete} onChange={id === "next" ? (event) => setPassword(event.target.value) : undefined} className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm text-neutral-800 outline-none placeholder:text-neutral-400" /><button type="button" onClick={() => setVisible((current) => ({ ...current, [id]: !current[id] }))} aria-label={`${visible[id] ? "Ocultar" : "Mostrar"} ${label.toLowerCase()}`} className="px-4 py-3 text-neutral-400 transition-colors hover:text-red-700">{visible[id] ? <EyeOff size={17} /> : <Eye size={17} />}</button></label>)}
      </div>
      <button type="button" disabled className="mt-4 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-neutral-800 px-4 py-3 text-sm font-bold text-white/70">Actualizar contraseña <ArrowRight size={16} /></button>
      <div className="ml-auto max-w-64"><PasswordValidation password={password} light showCount /></div>
      <p className="mt-2 text-xs text-neutral-500">La actualización de contraseña aún no está disponible.</p>
    </section>
  );
}
