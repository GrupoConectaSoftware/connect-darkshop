import { useState } from 'react'
import { CalendarDays, CreditCard, LockKeyhole, Plus } from 'lucide-react'
import OnboardingSection, { actionRowClass, inputClass, labelClass, primaryActionClass, skipActionClass } from '../components/OnboardingSection'

export default function PaymentSection({ initialData, onNext, onLogout }) {
  const [card, setCard] = useState(initialData.card)
  const update = (field) => (event) => setCard((current) => ({ ...current, [field]: event.target.value }))

  return (
    <OnboardingSection activeStep={4} eyebrow="Paso 04 de 06" title="Métodos de pago" subtitle="Configura una opción de pago para realizar compras rápidas, seguras y sin complicaciones." onLogout={onLogout}>
      <section className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 sm:p-5" aria-labelledby="credit-card-title">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 id="credit-card-title" className="flex items-center gap-2 text-sm font-bold text-white"><CreditCard size={18} aria-hidden="true" />Tarjeta de crédito o débito</h2>
          <span className="flex items-center gap-1.5 text-[0.6rem] text-neutral-500"><LockKeyhole size={13} aria-hidden="true" />Conexión segura</span>
        </div>

        <div className="space-y-4">
          <div><label htmlFor="card-number" className={labelClass}>Número de tarjeta</label><div className="relative"><input id="card-number" inputMode="numeric" autoComplete="cc-number" value={card.number} onChange={update('number')} placeholder="4242 4242 4242 4242" className={`${inputClass} pr-11`} /><CreditCard size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true" /></div></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label htmlFor="card-expiry" className={labelClass}>Vencimiento</label><div className="relative"><input id="card-expiry" inputMode="numeric" autoComplete="cc-exp" value={card.expiry} onChange={update('expiry')} placeholder="MM / AA" className={`${inputClass} pr-10`} /><CalendarDays size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true" /></div></div>
            <div><label htmlFor="card-cvv" className={labelClass}>CVV</label><div className="relative"><input id="card-cvv" type="password" inputMode="numeric" autoComplete="cc-csc" value={card.cvv} onChange={update('cvv')} placeholder="123" className={`${inputClass} pr-10`} /><LockKeyhole size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" aria-hidden="true" /></div></div>
          </div>
          <div><label htmlFor="card-name" className={labelClass}>Nombre en la tarjeta</label><input id="card-name" autoComplete="cc-name" value={card.name} onChange={update('name')} placeholder="Ej. Juan Pérez" className={inputClass} /></div>
          <button type="button" className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-100 py-3 text-xs font-black uppercase text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600">Guardar tarjeta <Plus size={16} aria-hidden="true" /></button>
        </div>
      </section>

      <div className={actionRowClass}>
        <button type="button" onClick={() => onNext({ card: { number: '', expiry: '', cvv: '', name: '' }, method: 'omitido' })} className={skipActionClass}>Omitir</button>
        <button type="button" onClick={() => onNext({ card, method: 'card' })} className={primaryActionClass}>Continuar</button>
      </div>
    </OnboardingSection>
  )
}
