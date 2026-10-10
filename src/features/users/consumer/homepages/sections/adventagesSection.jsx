import AdvantageCard from '../../../../../components/ui/cards/AdvantageCard'
import Reveal from '../../../../../ux/Reveal'

const ADVANTAGES = [
  {
    number: '01',
    eyebrow: 'Material',
    title: '100 % original',
    details: [
      'Prendas pesadas, cómodas y resistentes.',
      'Diseñadas para durar mucho más que una temporada.',
    ],
  },
  {
    number: '03',
    eyebrow: 'Confección',
    title: 'Hecho para durar',
    details: [
      'Costuras reforzadas.',
      'Acabados premium.',
      'Control de calidad en cada prenda.',
    ],
  },
  {
    number: '02',
    eyebrow: 'Envíos',
    title: 'Envíos nacionales',
    details: [
      'Despachamos en menos de 24 horas.',
      'Cobertura en toda Colombia.',
      'Seguimiento desde el primer momento.',
    ],
  },
  {
    number: '04',
    eyebrow: 'Exclusividad',
    title: 'Drops limitados',
    details: [
      'No producimos grandes cantidades.',
      'Cuando un drop se agota, no vuelve.',
    ],
  },
]

export default function AdvantagesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-dark-950 text-dark-white">
      {/* Marca de agua gigante */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap text-[clamp(9rem,30vw,32rem)] font-black leading-none tracking-[-0.09em] text-dark-900/45"
      >
        DARKSHOP
      </span>

      <div className="relative mx-auto max-w-[1800px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
        {/* Header */}
        <header className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <Reveal>
            <p className="mb-6 text-sm font-medium uppercase tracking-wide text-dark-red">
              ¿Por qué Darkshop?
            </p>
            <h2 className="text-[clamp(2rem,5.7vw,7rem)] font-black uppercase leading-[0.88] tracking-[-0.07em]">
              <span className="block whitespace-nowrap text-dark-500">No es moda</span>
              <span className="mt-2 block whitespace-nowrap text-dark-white">Es la Darkshop</span>
            </h2>
          </Reveal>

          <Reveal effect="fade" delay={140} className="max-w-3xl lg:justify-self-end">
            <p className="text-lg font-light leading-[1.2] tracking-[-0.035em] text-dark-400 sm:text-xl lg:text-2xl">
              No hacemos ropa para seguir tendencias. Diseñamos prendas que
              puedan acompañarte durante años, con materiales reales, confección
              cuidada y una identidad que no necesita llamar la atención para
              destacar.
            </p>
            <p className="mt-6 text-lg font-bold leading-tight tracking-[-0.035em] text-dark-white sm:text-xl lg:text-2xl">
              Vestir de negro nunca fue una moda... Es una tendencia
            </p>
          </Reveal>
        </header>

        {/* Grid de advantages */}
        <div className="mt-20 grid gap-x-12 gap-y-4 lg:mt-36 lg:grid-cols-2 lg:gap-x-24">
          {ADVANTAGES.map((advantage, index) => (
            <Reveal key={advantage.number} delay={index * 90} className="h-full">
              <AdvantageCard {...advantage} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
