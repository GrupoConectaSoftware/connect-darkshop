import { useRef, useState } from 'react'
import { Camera, ChevronDown, Flag, Mail, Phone, Trash2, Upload, UserRound } from 'lucide-react'
import defaultProfileImage from '../../../../../assets/Profile/imagesProfile.webp'
import OnboardingSection, { continueClass, inputWithIconClass, labelClass } from '../components/OnboardingSection'

export default function ProfileSection({ initialData, onNext, onLogout }) {
  const fileInput = useRef(null)
  const [photo, setPhoto] = useState(initialData.photo)
  const [name, setName] = useState(initialData.name)
  const [email, setEmail] = useState(initialData.email)
  const [phone, setPhone] = useState(initialData.phone)

  const handlePhoto = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(String(reader.result || ''))
    reader.readAsDataURL(file)
  }

  return (
    <OnboardingSection activeStep={2} eyebrow="Paso 02 de 06" title="Información personal" subtitle="Cuéntanos quién eres y cómo podemos contactarte para personalizar tu perfil." onLogout={onLogout}>
      <div className="mb-7 flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
        <div className="relative size-20 shrink-0">
          <img src={photo || defaultProfileImage} alt="Foto de perfil" className="size-full rounded-full border-2 border-neutral-700 object-cover" />
          <span className="absolute bottom-0 right-0 grid size-7 place-items-center rounded-full bg-white text-black ring-2 ring-neutral-950"><Camera size={14} aria-hidden="true" /></span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white">Foto de perfil</p>
          <p className="mt-1 text-xs text-neutral-500">Personaliza tu cuenta con una imagen.</p>
          <input ref={fileInput} type="file" accept="image/*" onChange={handlePhoto} className="sr-only" aria-label="Seleccionar foto de perfil" />
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" onClick={() => fileInput.current?.click()} className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-red-600"><Upload size={14} aria-hidden="true" />Subir</button>
            <button type="button" onClick={() => setPhoto('')} className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-red-600"><Trash2 size={14} aria-hidden="true" />Eliminar</button>
          </div>
        </div>
      </div>

      <form onSubmit={(event) => { event.preventDefault(); onNext({ name, email, phone, photo }) }} className="space-y-4">
        <div><label htmlFor="profile-name" className={labelClass}>Nombre completo</label><div className="relative"><UserRound size={17} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" /><input id="profile-name" autoComplete="name" required value={name} onChange={(event) => setName(event.target.value)} placeholder="Ej: Jhon Arias Duque" className={inputWithIconClass} /></div></div>
        <div><label htmlFor="profile-email" className={labelClass}>Correo electrónico</label><div className="relative"><Mail size={17} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" /><input id="profile-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Ej: usuario@correo.com" className={inputWithIconClass} /></div></div>
        <div>
          <label htmlFor="profile-phone" className={labelClass}>Teléfono</label>
          <div className="flex rounded-lg border border-neutral-800 bg-neutral-900 transition-all focus-within:border-transparent focus-within:ring-2 focus-within:ring-red-600">
            <div className="flex shrink-0 items-center gap-2 border-r border-neutral-800 px-4 text-xs text-neutral-300"><Flag size={15} className="text-neutral-500" aria-hidden="true" />CO <span>+57</span><ChevronDown size={13} className="text-neutral-600" aria-hidden="true" /></div>
            <div className="relative min-w-0 flex-1"><Phone size={17} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" /><input id="profile-phone" type="tel" autoComplete="tel-national" required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="333 333 3333" className="w-full rounded-r-lg bg-transparent py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-600" /></div>
          </div>
        </div>
        <button type="submit" className={continueClass}>Continuar</button>
      </form>
    </OnboardingSection>
  )
}
