import { Headphones, ArrowRight } from "lucide-react";
export default function SupportCard() {
  return <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 rounded-xl border border-neutral-200 bg-white p-3"><div className="flex items-center gap-3"><Headphones size={22}/><div><p className="text-sm font-bold">¿Necesitas ayuda con un pedido?</p><p className="mt-1 text-xs text-neutral-500">Contáctanos y te ayudaremos.</p></div></div><a href="mailto:darkshop@reportas.com?subject=Ayuda%20con%20mi%20pedido" className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-semibold">Ir al soporte <ArrowRight size={14}/></a></div>;
}
