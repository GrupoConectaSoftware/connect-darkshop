import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CarouselControlButton({ direction, onHover, onLeave }) {
  const label = direction === 'left' ? 'Acelerar hacia atrás' : 'Acelerar hacia adelante'
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return <button type="button" aria-label={label} onMouseEnter={onHover} onMouseLeave={onLeave} onFocus={onHover} onBlur={onLeave} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-dark-300/70 bg-dark-white/75 text-dark-500 shadow-sm transition-[background-color,color,border-color,opacity] duration-300 hover:border-dark-500 hover:bg-dark-white hover:text-dark-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-dark-red"><Icon size={20} strokeWidth={1.6} /></button>
}
