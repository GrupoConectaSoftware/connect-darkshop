import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import startConfigImage from '../../../../assets/Profile/config/startConfig.webp'
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
    <main className="h-screen h-dvh overflow-hidden bg-neutral-950">
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-[60%_40%]">
        <aside className="relative hidden h-full w-full overflow-hidden lg:block" aria-label="Presentación de DarkShop">
          <img src={startConfigImage} alt="Bienvenida al ecosistema de moda DarkShop" className="absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40" />
        </aside>

        <div className="h-full overflow-y-auto bg-[#0a0a0a]">
          <div className="mx-auto flex min-h-full w-full max-w-lg flex-col justify-center px-5 py-8 sm:px-8 sm:py-12 lg:px-7 xl:px-8">
            {content}
          </div>
        </div>
      </div>
    </main>
  )
}
