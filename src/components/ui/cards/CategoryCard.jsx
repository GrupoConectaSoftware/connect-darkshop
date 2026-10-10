import { ArrowRight } from 'lucide-react'
import ImageZoom from '../../../ux/ImageZoom'

export default function CategoryCard({ category }) {
  const { name, itemsCount, description, image } = category

  return (
    <article className="group relative min-w-0 cursor-pointer overflow-hidden bg-dark-950 transition-shadow duration-400 ease-out hover:z-10 focus-within:outline focus-within:outline-dark-red" tabIndex={0}>
      <div className="h-160 w-full overflow-hidden sm:h-180 lg:h-200">
        <ImageZoom className="h-full w-full">
          <img src={image} alt={name} className="h-full w-full object-cover grayscale transition-[filter] duration-700 ease-in-out group-hover:grayscale-0" />
        </ImageZoom>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex max-h-[78%] translate-y-3 flex-col justify-end overflow-y-auto bg-linear-to-t from-dark-950 via-dark-950/85 to-transparent p-4 opacity-0 transition-[transform,opacity] duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-5">
        <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.04em] text-dark-white sm:text-xl">{name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="h-px flex-1 bg-dark-400" />
          <span className="text-[11px] uppercase tracking-wider text-dark-300 sm:text-xs">{itemsCount} artículos</span>
        </div>
        <p className="mt-2 max-w-xs text-xs leading-relaxed text-dark-200 sm:text-sm">{description}</p>
        <a href="#coleccion" className="mt-3 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark-white transition-colors hover:text-dark-red sm:text-sm">
          Explorar <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

    </article>
  )
}
