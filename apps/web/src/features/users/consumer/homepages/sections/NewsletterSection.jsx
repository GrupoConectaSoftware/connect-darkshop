import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    // TODO: conectar aquí el endpoint real de suscripción cuando esté disponible.
    setIsSubscribed(true)
  }

  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden border-t border-dark-red/60 bg-newsletter px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16 xl:px-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-dark-burgundy/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-[1800px] items-center gap-7 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 font-body text-[10px] font-medium uppercase tracking-wide text-dark-red sm:mb-4 sm:text-xs">Suscríbete en la comunidad</p>
          <h2 id="newsletter-title" className="font-display text-xl uppercase leading-none tracking-[-0.04em] sm:text-4xl lg:text-5xl xl:text-6xl">
            <span className="block text-neutral-500">10% de descuento</span>
            <span className="block whitespace-nowrap text-white">En tu primera compra</span>
          </h2>
          <p className="mt-4 max-w-2xl font-body text-xs font-light leading-relaxed text-neutral-400 sm:mt-5 sm:text-sm lg:mt-6 lg:text-lg">Drops nuevos, accesos anticipados y códigos privados. Sin spam, solo lo importante.</p>
        </div>

        <div className="min-w-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:gap-0">
            <label htmlFor="newsletter-email" className="sr-only">Tu correo electrónico</label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => { setEmail(event.target.value); setIsSubscribed(false) }}
              placeholder="tu@email.com"
              className="h-14 min-w-0 flex-1 border border-neutral-700 bg-transparent px-5 font-body text-base font-light text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-white focus:ring-2 focus:ring-white/20 lg:h-16 lg:px-6 lg:text-lg"
            />
            <button type="submit" className="group inline-flex h-14 shrink-0 cursor-pointer items-center justify-center gap-5 rounded-sm bg-white px-5 font-body text-[10px] font-semibold uppercase tracking-wide text-dark-950 transition-colors hover:bg-dark-red hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none sm:px-6 lg:h-16 lg:gap-7 lg:px-8 lg:text-xs">
              Suscribirme ahora
              <ArrowRight size={22} strokeWidth={1.25} className="transition-transform duration-300 group-hover:translate-x-1.5 motion-reduce:transition-none" />
            </button>
          </form>
          <p aria-live="polite" className="mt-3 min-h-4 font-body text-[10px] uppercase leading-relaxed text-neutral-400">
            {isSubscribed ? 'Listo. Revisa tu correo.' : 'Al suscribirte tendrás información de primera mano sobre últimos lanzamientos.'}
          </p>
        </div>
      </div>
    </section>
  )
}
