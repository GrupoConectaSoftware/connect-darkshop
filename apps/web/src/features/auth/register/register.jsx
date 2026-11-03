import registerVideo from '../../../movies/register/vidRegister.mp4'
import RegisterForm from './components/formComponents'

export default function Register() {
  return (
    <main className="grid h-screen w-full grid-cols-1 overflow-hidden bg-dark-950 text-dark-white lg:grid-cols-2">
      <section className="order-1 relative hidden min-h-0 overflow-hidden bg-dark-900 lg:block" aria-label="Editorial DARKSHOP">
        <video autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 size-full object-cover" aria-label="Video editorial de la colección DARKSHOP">
          <source src={registerVideo} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-8 drop-shadow-lg xl:p-12 2xl:p-16">
          <p className="mb-4 font-body text-xs font-medium tracking-[0.12em] text-white/65">BIENVENIDO · DARKSHOP</p>
          <h2 className="max-w-xl font-display text-4xl uppercase leading-[0.88] tracking-[-0.045em] text-dark-white xl:text-5xl 2xl:text-6xl">Tu historia<br />empieza aquí.</h2>
          <p className="mt-4 max-w-sm font-body text-base font-light leading-tight tracking-[-0.03em] text-white/75 xl:text-lg">Descubre piezas esenciales y novedades para construir tu propio archivo.</p>
        </div>
      </section>

      <section className="order-2 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col justify-center px-6 py-4 sm:px-10 sm:py-5 lg:px-12 lg:py-3 xl:px-14">
          <div className="mb-4 sm:mb-5">
            <p className="mb-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-dark-300 sm:text-xs">Registrar cuenta</p>
            <h1 className="font-display text-2xl uppercase leading-none tracking-[-0.04em] text-dark-white sm:text-3xl">Entra o pierde.</h1>
            <p className="mt-2 font-body text-base font-light leading-tight tracking-[-0.035em] text-dark-400 sm:text-lg">Samples, últimas piezas y archivo.<br />Cero segundas oportunidades.</p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </main>
  )
}
