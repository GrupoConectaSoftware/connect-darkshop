export default function BenefitCard({ icon: Icon, title, subtitle, className = '' }) {
  return (
    <article className={`flex min-h-36 items-center gap-5 px-6 py-9 sm:px-7 lg:min-h-44 lg:gap-6 lg:px-8 lg:py-10 ${className}`}>
      <span className="grid h-14 w-14 shrink-0 place-items-center text-dark-white lg:h-16 lg:w-16">
        <Icon size={32} strokeWidth={1.5} />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-bold uppercase tracking-wide text-dark-white lg:text-lg">{title}</span>
        <span className="mt-2 block text-sm leading-relaxed text-dark-400 lg:text-base">{subtitle}</span>
      </span>
    </article>
  )
}
