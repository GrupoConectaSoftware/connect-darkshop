import { CreditCard, Heart, MapPin, Pencil, UserRound } from 'lucide-react'
import defaultProfileImage from '../../../../../assets/Profile/imagesProfile.webp'
import OnboardingSection, { continueClass } from '../components/OnboardingSection'

const LABELS = {
  urban: 'Urbano', elegant: 'Elegante', sport: 'Deportivo', oversize: 'Oversize',
  shirts: 'Camisetas', pants: 'Pantalones', shorts: 'Shorts', socks: 'Medias', glasses: 'Gafas', shoes: 'Zapatos',
}

function SummaryCard({ icon: Icon, title, onEdit, children }) {
  return (
    <section className="flex items-start gap-4 rounded-lg border border-neutral-800 bg-[#111] p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-neutral-900 text-neutral-400"><Icon size={18} aria-hidden="true" /></span>
      <div className="min-w-0 flex-1"><h2 className="text-sm font-bold text-white">{title}</h2><div className="mt-1 text-xs leading-relaxed text-neutral-500">{children}</div></div>
      <button type="button" onClick={onEdit} aria-label={`Editar ${title.toLowerCase()}`} className="inline-flex shrink-0 items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"><Pencil size={13} aria-hidden="true" /><span className="hidden sm:inline">Editar</span></button>
    </section>
  )
}

export default function RedirectSection({ data, onComplete, onLogout, onEdit }) {
  const lastDigits = data.payment.card.number.replace(/\s/g, '').slice(-4) || '4242'
  const preferences = [...data.preferences.styles, ...data.preferences.categories].map((item) => LABELS[item] || item).concat(data.preferences.brands).join(', ')

  return (
    <OnboardingSection activeStep={6} eyebrow="Paso 06 de 06" title="Todo listo" subtitle="Revisa tus datos antes de entrar a DarkShop. Puedes volver a cualquier paso para editar la información." onLogout={onLogout}>
      <div className="space-y-3">
        <SummaryCard title="Información personal" icon={UserRound} onEdit={() => onEdit(2)}>
          <div className="flex items-center gap-3"><img src={data.profile.photo || defaultProfileImage} alt="" className="size-9 rounded-full object-cover" /><span><span className="block font-semibold text-neutral-300">{data.profile.name || 'Tu nombre'}</span><span className="block">{data.profile.email || 'correo@ejemplo.com'}</span><span className="block">+57 {data.profile.phone || '300 123 4567'}</span></span></div>
        </SummaryCard>
        <SummaryCard title="Dirección" icon={MapPin} onEdit={() => onEdit(3)}><span className="block text-neutral-300">{data.location.address}</span><span className="block">Cali, Valle del Cauca</span></SummaryCard>
        <SummaryCard title="Método de pago" icon={CreditCard} onEdit={() => onEdit(4)}><span className="mr-2 inline-flex rounded bg-white px-1.5 py-0.5 text-[0.55rem] font-black text-black">{data.payment.method.toUpperCase()}</span><span>•••• {lastDigits}</span></SummaryCard>
        <SummaryCard title="Preferencias" icon={Heart} onEdit={() => onEdit(5)}>{preferences}</SummaryCard>
      </div>
      <button type="button" onClick={onComplete} className={continueClass}>Entrar a DarkShop</button>
    </OnboardingSection>
  )
}
