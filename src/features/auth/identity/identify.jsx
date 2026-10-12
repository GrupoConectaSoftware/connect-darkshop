import { useLocation } from 'react-router-dom'
import banImage from '../../../assets/Sections/auth/ban/banSection.webp'
import ImageZoom from '../../../components/ux/ImageZoom'
import IdentityComponents from './components/identityComponents'

export default function Verify() {
  const { state } = useLocation()
  const email = state?.email || ''
  const [localPart, domain] = email.split('@')
  const maskedEmail = localPart && domain
    ? `${localPart.slice(0, 2)}${'*'.repeat(Math.max(3, localPart.length - 2))}@${domain}`
    : 'al****@gmail.com'

  return (
    <main className="grid min-h-screen w-full bg-white text-neutral-950 lg:min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden min-h-dvh overflow-hidden bg-neutral-950 lg:block" aria-label="Editorial DARKSHOP">
        <ImageZoom className="absolute inset-0"><img src={banImage} alt="" className="size-full object-cover" /></ImageZoom>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-8 drop-shadow-lg xl:p-12 2xl:p-16">
          <p className="mb-3 font-body text-xs font-medium tracking-[0.12em] text-white/65">DARKSHOP · VERIFICACIÓN</p>
          <h2 className="max-w-xl font-display text-4xl uppercase leading-[0.9] tracking-[-0.045em] text-white xl:text-5xl 2xl:text-6xl">
            Tu acceso empieza<br />con una confirmación.
          </h2>
        </div>
      </aside>

      <section className="flex min-h-screen min-w-0 items-center justify-center px-6 py-10 sm:px-10 lg:min-h-dvh lg:px-12 lg:py-16 xl:px-16">
        <IdentityComponents
          email={maskedEmail}
          onVerify={(code) => console.info('Código para verificar:', code)}
          onResend={() => console.info('Reenvío de código solicitado')}
          expiresIn={272}
        />
      </section>
    </main>
  )
}
