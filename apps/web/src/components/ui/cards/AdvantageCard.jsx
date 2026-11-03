export default function AdvantageCard({ number, eyebrow, title, details }) {
  return (
    <article className="group relative flex h-full flex-col pt-10 pb-12 sm:pt-12 lg:pt-14">
      {/* Grid interno: número a la izquierda, contenido a la derecha */}
      <div className="flex items-start gap-6 sm:gap-8 lg:gap-10">
        {/* Número gigante */}
        <span className="select-none text-[clamp(3.5rem,7vw,5.5rem)] font-black leading-[0.85] tracking-[-0.06em] text-dark-500/70 transition-colors duration-500 group-hover:text-dark-white">
          {number}
        </span>

        {/* Bloque de texto */}
        <div className="flex-1 pt-2 sm:pt-3">
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-dark-500">
            {eyebrow}
          </p>

          <h3 className="text-[clamp(1.6rem,3.2vw,2.6rem)] font-black uppercase leading-[0.95] tracking-[-0.045em] text-dark-white">
            {title}
          </h3>

          <ul className="mt-5 space-y-1.5">
            {details.map((detail, i) => (
              <li
                key={i}
                className="text-sm font-light leading-snug tracking-[-0.01em] text-dark-400 sm:text-base"
              >
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Línea separadora inferior con animación de barrido en hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-dark-white/15"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-dark-white transition-all duration-700 ease-out group-hover:w-full"
      />
    </article>
  )
}
