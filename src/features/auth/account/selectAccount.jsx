import accountImage from '../../../assets/Sections/auth/selectAccount/Section/AccountSesion.webp'
import FormSelect from './components/formSelect'

export default function SelectAccount() {
  return (
    <main className="grid h-screen h-dvh w-full grid-cols-1 overflow-hidden bg-dark-950 text-dark-white lg:grid-cols-2">
      <section aria-label="DARKSHOP, una tienda hecha para encontrar tu estilo" className="relative hidden min-h-0 overflow-hidden bg-dark-900 lg:block">
        <img src={accountImage} alt="Interior oscuro de DARKSHOP con prendas de la colección" className="absolute inset-0 size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-8 drop-shadow-lg xl:p-12 2xl:p-16">
          <p className="mb-4 font-body text-xs font-medium tracking-[0.12em] text-white/65">DARKSHOP · TU PRÓXIMO CAPÍTULO</p>
          <h2 className="max-w-xl font-display text-4xl uppercase leading-[0.88] tracking-[-0.045em] text-dark-white xl:text-5xl 2xl:text-6xl">
            Una marca.<br />Dos formas de vivirla.
          </h2>
          <p className="mt-4 max-w-sm font-body text-base font-light leading-tight tracking-[-0.03em] text-white/75 xl:text-lg">
            Encuentra tu lugar en el universo DARKSHOP.
          </p>
        </div>
      </section>

      <section className="min-h-0 min-w-0 overflow-x-hidden overflow-y-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-6 py-6 sm:px-10 sm:py-8 lg:px-12 xl:px-16">
          <FormSelect />
        </div>
      </section>
    </main>
  )
}
