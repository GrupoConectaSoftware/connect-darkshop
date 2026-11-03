import { useState } from 'react'
import { Search } from 'lucide-react'
import outletOne from '../../../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../../../assets/Sections/homespages/outlet/products/outletTres.webp'
import GarmentSwitch from '../../../../../components/ui/buttons/GarmentSwitch'
import ImageZoomModal from '../../../../../components/ux/ImageZoomModal'

const LOCAL_IMAGES = [outletOne, outletTwo, outletThree]

export default function ImagesComponents({ images, productName }) {
  // TODO: sustituir estas imágenes locales por las referencias del producto desde backend.
  const gallery = images?.length >= 3 ? images : LOCAL_IMAGES
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState('model')
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const activeImage = viewMode === 'model' ? gallery[activeIndex] : gallery[(activeIndex + 1) % gallery.length]

  return (
    <>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[6.5rem_minmax(0,1fr)]">
        <div className="order-2 grid grid-cols-3 gap-3 sm:gap-4 lg:order-1 lg:flex lg:flex-col">
          {gallery.slice(0, 3).map((image, index) => (
            <div key={image} className="relative aspect-[3/4]">
              <button type="button" onClick={() => setActiveIndex(index)} aria-label={`Ver imagen ${index + 1} de ${productName}`} className={`size-full cursor-pointer overflow-hidden transition-colors ${activeIndex === index ? 'border-2 border-dark-950' : 'border border-dark-200 hover:border-dark-500'}`}>
                <img src={image} alt="" className={`size-full object-cover object-top transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="relative order-1 aspect-[3/4] overflow-hidden border border-dark-300 bg-dark-100 lg:order-2">
          <img src={activeImage} alt={productName} className="size-full cursor-zoom-in object-cover object-top transition-transform duration-500 ease-out hover:scale-[1.05]" />
          <button type="button" onClick={() => setIsZoomOpen(true)} aria-label="Ampliar imagen" className="absolute bottom-3 left-3 z-10 grid size-11 cursor-pointer place-items-center rounded-full bg-white text-dark-950 shadow-md transition hover:scale-105 hover:bg-dark-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red sm:bottom-4 sm:left-4 sm:size-12"><Search size={20} /></button>
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4"><GarmentSwitch value={viewMode} onChange={setViewMode} /></div>
        </div>
      </div>
      <ImageZoomModal isOpen={isZoomOpen} onClose={() => setIsZoomOpen(false)} src={activeImage} alt={productName} />
    </>
  )
}
