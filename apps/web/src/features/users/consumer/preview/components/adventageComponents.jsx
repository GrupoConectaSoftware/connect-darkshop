import { useState } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import ImageZoomModal from '../../../../../components/ux/ImageZoomModal'
import { productDetailsData, reviewsData } from '../../../../../data/reviewsData'

export default function AdventageComponents() {
  const [open, setOpen] = useState('description')
  const [zoomImage, setZoomImage] = useState(null)
  return <section aria-label="Información adicional del producto" className="mx-auto max-w-5xl">
    {productDetailsData.map((spec) => {
      const isOpen = open === spec.id
      return <article key={spec.id} className="border-b border-dark-200 first:border-t dark:border-[#2a2a2d]">
        <button type="button" onClick={() => setOpen(isOpen ? null : spec.id)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"><span className="text-sm font-semibold uppercase text-dark-950 sm:text-base dark:text-white">{spec.title}</span><ChevronDown size={19} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} /></button>
        {isOpen && <div className="pb-7 text-sm leading-relaxed text-dark-600 dark:text-neutral-300">{spec.id === 'reviews' ? <div className="space-y-6">{reviewsData.length === 0 ? <p>Aún no hay reseñas para este producto.</p> : reviewsData.map((review) => <article key={review.id} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-neutral-100 dark:border-neutral-700 pt-5 first:border-0 first:pt-0 sm:grid-cols-[3rem_minmax(0,1fr)_auto]">
          <img src={review.avatar} alt={`Foto de ${review.name}`} className="size-12 rounded-md object-cover" />
          <div><p className="text-sm font-bold text-neutral-950 dark:text-white">{review.name}</p><p className="mt-1 text-xs text-neutral-500 dark:text-gray-400">{review.date}</p><div className="mt-2 flex gap-0.5" aria-label={`${review.rating} de 5 estrellas`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} aria-hidden="true" className={index < review.rating ? 'fill-red-600 text-red-600' : 'fill-neutral-200 text-neutral-200'} />)}</div><p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">{review.comment}</p></div>
          <div className="col-start-2 flex gap-2 sm:col-auto">{review.images.slice(0, 3).map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setZoomImage(image)} aria-label={`Ampliar foto ${index + 1} de ${review.name}`} className="overflow-hidden rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700"><img src={image} alt="" className="size-16 object-cover transition-transform hover:scale-105" /></button>)}</div>
        </article>)}</div> : <><p>{spec.content}</p>{spec.highlight && <p className="mt-4 font-semibold italic text-dark-950 dark:text-white">{spec.highlight}</p>}</>}</div>}
      </article>
    })}
    <ImageZoomModal isOpen={Boolean(zoomImage)} onClose={() => setZoomImage(null)} src={zoomImage} alt="Foto adjunta a la reseña" />
  </section>
}
