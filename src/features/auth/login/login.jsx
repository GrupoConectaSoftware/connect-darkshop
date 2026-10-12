import { Link } from 'react-router-dom'
import logoDarkShop from '../../../assets/Logometria/LogoOficial.webp'
import loginVideo from '../../../movies/login/vidLogin.mp4'
import LoginForm from './components/formComponent'

export default function Login() {
  return (
    <main className="grid h-screen w-screen max-w-full min-w-0 grid-cols-1 overflow-hidden bg-dark-950 text-dark-white lg:grid-cols-2">
      <section className="h-full min-h-0 min-w-0 overflow-x-hidden overflow-y-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="mx-6 flex min-h-full w-auto min-w-0 max-w-full flex-col justify-center py-7 sm:mx-10 sm:py-8 lg:mx-auto lg:w-full lg:max-w-190 lg:px-12 xl:px-16 2xl:px-20">

          <div className="mb-6 sm:mb-7">
            <p className="mb-3 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-dark-300 sm:text-xs">Iniciar sesión</p>
            <h1 className="font-display text-3xl uppercase leading-none tracking-[-0.04em] text-dark-white sm:text-4xl">Bienvenido de vuelta</h1>
            <p className="mt-4 font-body text-lg font-light leading-tight tracking-[-0.035em] text-dark-400 sm:text-xl lg:text-2xl">
              El archivo está abierto.<br />
              El que llega tarde no compra.
            </p>
          </div>

          <LoginForm />
        </div>
      </section>

      <section aria-label="Editorial DARKSHOP" className="relative hidden h-full min-h-0 overflow-hidden bg-dark-900 lg:block">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 size-full object-cover" aria-label="Video editorial de la colección DARKSHOP">
          <source src={loginVideo} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-8 drop-shadow-lg xl:p-12 2xl:p-16">
          <p className="mb-4 font-body text-xs font-medium tracking-[0.12em] text-white/65">Editorial · 2026 / SS · Void Collection</p>
          <h2 className="max-w-xl font-display text-4xl uppercase leading-[0.88] tracking-[-0.045em] text-dark-white xl:text-5xl 2xl:text-6xl">
            El silencio<br />también es ruido.
          </h2>
          <p className="mt-4 max-w-sm font-body text-base font-light leading-tight tracking-[-0.03em] text-white/75 xl:text-lg">
            Donde las formas se disuelven y solo queda la esencia.
          </p>
        </div>
      </section>
    </main>
  )
}
