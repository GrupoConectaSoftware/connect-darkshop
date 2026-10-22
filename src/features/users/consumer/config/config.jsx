import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import startConfigImage from '../../../../assets/Profile/config/startConfig.webp'
import Logged from '../logged/logged'
import LocationSection from './sections/locationSection'
import PaymentSection from './sections/paymentSection'
import PreferencesSection from './sections/preferencesSection'
import ProfileSection from './sections/profileSection'
import RedirectSection from './sections/redirectSection'
import WelcomeSection from './sections/welcomeSection'

const INITIAL_DATA = {
  profile: { name: '', email: '', phone: '', photo: '' },
  location: { address: 'Cra 12D #58-09, La Base - Cali, Colombia' },
  payment: { method: 'nequi', card: { number: '', expiry: '', cvv: '', name: '' } },
  preferences: { styles: ['urban'], categories: ['shirts', 'pants', 'shorts'], brands: ['DARK'] },
}

export default function Config() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState(INITIAL_DATA)
  const logout = () => navigate('/expired')
  const saveAndContinue = (key, nextStep) => (value) => {
    setData((current) => ({ ...current, [key]: value }))
    setStep(nextStep)
  }

  let content = <WelcomeSection onNext={() => setStep(2)} onLogout={logout} />
  if (step === 2) content = <ProfileSection initialData={data.profile} onNext={saveAndContinue('profile', 3)} onLogout={logout} />
  if (step === 3) content = <LocationSection initialData={data.location} onNext={saveAndContinue('location', 4)} onLogout={logout} />
  if (step === 4) content = <PaymentSection initialData={data.payment} onNext={saveAndContinue('payment', 5)} onLogout={logout} />
  if (step === 5) content = <PreferencesSection initialData={data.preferences} onNext={saveAndContinue('preferences', 6)} onLogout={logout} />
  if (step === 6) content = <RedirectSection data={data} onComplete={() => navigate('/logged')} onLogout={logout} onEdit={setStep} />

  return (
    <main className="relative min-h-dvh overflow-hidden bg-neutral-950">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden blur-[5px] brightness-75">
        <Logged />
      </div>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-3 backdrop-blur-sm sm:p-5 lg:p-6">
        <section role="dialog" aria-modal="true" aria-label="Configuración de cuenta DarkShop" className="grid h-[95dvh] w-[90vw] max-w-[1600px] grid-cols-2 overflow-hidden border border-white/10 bg-[#0a0a0a] shadow-2xl">
          <aside className="relative h-full min-h-0 w-full overflow-hidden" aria-label="Presentación de DarkShop">
            <img src={startConfigImage} alt="Bienvenida al ecosistema de moda DarkShop" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-black/10 via-transparent to-black/40" />
          </aside>

          <div className="h-full min-h-0 overflow-y-auto bg-[#0a0a0a] [scrollbar-color:#dc2626_transparent] scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-red-600">
            <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10">
              {content}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
