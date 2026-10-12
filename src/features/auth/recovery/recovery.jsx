import { useNavigate } from 'react-router-dom'
import recoveryImage from '../../../assets/Sections/auth/recover/recoverSection.webp'
import RecoveryComponents from './components/recoveryComponents'

export default function Recovery() {
  const navigate = useNavigate()

  const handleRecoverySubmit = (email) => {
    navigate('/verify', { state: { email } })
  }

  return (
    <main className="grid min-h-screen w-full bg-white text-neutral-950 lg:min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden min-h-dvh overflow-hidden bg-neutral-950 lg:block" aria-label="Editorial DARKSHOP">
        <img src={recoveryImage} alt="" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-8 drop-shadow-lg xl:p-12 2xl:p-16">
          <p className="mb-3 font-body text-xs font-medium tracking-[0.12em] text-white/65">DARKSHOP · RECUPERACIÓN</p>
          <h2 className="max-w-xl font-display text-4xl uppercase leading-[0.9] tracking-[-0.045em] text-white xl:text-5xl 2xl:text-6xl">
            Un paso más<br />para volver a tu espacio.
          </h2>
        </div>
      </aside>

      <section className="flex min-h-screen min-w-0 items-center justify-center px-6 py-10 sm:px-10 lg:min-h-dvh lg:px-12 lg:py-16 xl:px-16">
        <RecoveryComponents
          maskedEmail="al****@gmail.com"
          onSubmit={handleRecoverySubmit}
          onBack={() => navigate('/login')}
        />
      </section>
    </main>
  )
}
