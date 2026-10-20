import { useState } from 'react'
import { MapPin } from 'lucide-react'
import OnboardingSection, { continueClass, inputWithIconClass, labelClass } from '../components/OnboardingSection'

export default function LocationSection({ initialData, onNext, onLogout }) {
  const [address, setAddress] = useState(initialData.address)
  const query = encodeURIComponent(address || 'Cali, Colombia')

  return (
    <OnboardingSection activeStep={3} eyebrow="Paso 03 de 06" title="Compartir ubicación" subtitle="Indícanos dónde estás para gestionar tus pedidos y ofrecerte una experiencia más cercana." onLogout={onLogout}>
      <form onSubmit={(event) => { event.preventDefault(); onNext({ address }) }}>
        <label htmlFor="delivery-address" className={labelClass}>Dirección</label>
        <div className="relative"><MapPin size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" /><input id="delivery-address" autoComplete="street-address" required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Escribe tu dirección" className={inputWithIconClass} /></div>

        <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border-2 border-red-700 bg-neutral-900">
          <iframe title={`Mapa de ${address}`} src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`} className="size-full border-0 grayscale-[20%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-lg border border-neutral-800 bg-neutral-900/60 p-4 text-xs leading-relaxed text-neutral-400">
          <MapPin size={17} className="mt-0.5 shrink-0 text-red-600" aria-hidden="true" />
          Verifica que el punto del mapa corresponda a la ubicación donde quieres recibir tus pedidos.
        </div>
        <button type="submit" className={continueClass}>Continuar</button>
      </form>
    </OnboardingSection>
  )
}
