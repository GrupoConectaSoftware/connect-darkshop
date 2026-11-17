import { Check } from 'lucide-react'

const steps = ['Pago recibido', 'Verificando pago', 'Confirmación']
export default function CheckoutTimeline({ stage }) {
  const active = stage === 'form' ? 0 : stage === 'processing' ? 1 : 2
  return <ol className="mt-8 flex items-start"><>{steps.map((label, index) => <li key={label} className="flex flex-1 flex-col items-center text-center"><div className="flex w-full items-center"><span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${index < active ? 'bg-neutral-950 text-white' : index === active ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.8)]' : 'bg-gray-200 text-gray-500'}`}>{index < active ? <Check size={14}/> : index + 1}</span>{index < steps.length - 1 && <span className={`h-px flex-1 ${index < active ? 'bg-red-600' : 'bg-gray-200'}`}/>}</div><span className={`mt-2 text-[10px] font-bold ${index === active ? 'text-red-600' : 'text-gray-500'}`}>{label}</span></li>)}</></ol>
}
