import { Shirt } from 'lucide-react'

export default function CollectionsButton({ count, label = 'Explora las últimas colecciones', onClick, href, className = '' }) {
  const Element = href ? 'a' : 'button'
  const handleClick = (event) => {
    if (onClick) onClick(event)
    else if (!href) document.getElementById('colecciones-carrusel')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' })
  }

  return (
    <Element href={href} type={href ? undefined : 'button'} onClick={handleClick} aria-label={`Ver colecciones, ${count} disponibles`} className={`group fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-transparent text-white active:scale-95 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-red-700 motion-reduce:transition-none sm:bottom-8 sm:left-8 ${className}`}>
      <span className="relative grid size-13 shrink-0 place-items-center rounded-full border border-white/15 bg-[#0a0a0a] shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-[border-color,box-shadow,transform] duration-450 group-hover:scale-[1.04] group-hover:border-[#c0000a] group-hover:shadow-[0_0_0_1px_rgba(192,0,10,.35),0_12px_36px_rgba(192,0,10,.25)] motion-reduce:transition-none">
        <Shirt size={21} strokeWidth={1.75} className="transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none" />
        <span aria-hidden="true" className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#e5e5e5] bg-[#c0000a] px-1 text-[11px] font-semibold tabular-nums">{count}</span>
      </span>
      <span className="grid h-11 w-0 shrink-0 place-items-center overflow-hidden rounded-full border border-transparent bg-[#0a0a0a] text-[13px] font-medium tracking-[.04em] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,.35)] transition-[width,opacity,border-color,box-shadow] duration-450 ease-[cubic-bezier(.22,.61,.36,1)] group-hover:w-67.5 group-hover:border-[#c0000a]/60 group-hover:opacity-100 group-hover:shadow-[0_0_0_1px_rgba(192,0,10,.2),0_12px_32px_rgba(0,0,0,.3)] group-focus-visible:w-67.5 group-focus-visible:border-[#c0000a]/60 group-focus-visible:opacity-100 motion-reduce:transition-none">
        <span className="whitespace-nowrap px-5">{label}</span>
      </span>
    </Element>
  )
}
