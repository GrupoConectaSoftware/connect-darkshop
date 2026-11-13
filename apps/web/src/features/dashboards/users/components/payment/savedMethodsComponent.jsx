import { useState } from "react";
import { CreditCard } from "lucide-react";
import { paymentLogos } from "./paymentLogos";

const methods = [{ brand: "Nequi", detail: "•••• 3021", note: "Cuenta" }, { brand: "Bancolombia", detail: "•••• 7710", note: "Cuenta de ahorros" }];

export default function SavedMethodsComponent() {
  const [selected, setSelected] = useState("Nequi");
  return <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-neutral-200/80 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="saved-methods-title">
    <div className="flex shrink-0 items-center gap-3 border-b border-neutral-100 pb-4"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><CreditCard size={19} /></span><div><h2 id="saved-methods-title" className="font-bold">Métodos de pago guardados</h2><p className="mt-0.5 text-xs text-neutral-500">Selecciona el método que quieres usar.</p></div></div>
    <fieldset className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><legend className="sr-only">Seleccionar método de pago</legend>{methods.map((method) => <label key={method.brand} className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 sm:p-5 ${selected === method.brand ? "border-red-700 bg-red-50/40 shadow-[0_4px_16px_rgba(127,29,29,0.08)]" : "border-neutral-200 hover:border-neutral-400"}`}><input type="radio" name="payment-method" checked={selected === method.brand} onChange={() => setSelected(method.brand)} className="size-4 shrink-0 accent-red-700" /><span className="grid h-14 w-24 shrink-0 place-items-center rounded-lg border border-neutral-100 bg-white p-3"><img src={paymentLogos[method.brand]} alt={method.brand} className="max-h-full max-w-full object-contain" /></span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-neutral-900">{method.brand} {method.detail}</span><span className="mt-1 block text-xs text-neutral-500">{method.note}</span><span className="mt-0.5 block text-xs text-neutral-400">Alejandro Aguilón</span></span>{method.brand === "Nequi" && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800">Predeterminado</span>}</label>)}</fieldset>
    <p className="mt-3 shrink-0 border-t border-neutral-100 pt-3 text-right text-xs text-neutral-500">Si deseas anexar otro método de pago, <button type="button" className="font-semibold text-red-800 transition-colors hover:text-red-600">pulsa aquí</button></p>
  </section>;
}
