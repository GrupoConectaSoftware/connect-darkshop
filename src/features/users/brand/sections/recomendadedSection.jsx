import { OUTLET_PRODUCTS_ON_SALE } from '../../../../components/ui/cards/productCardData'
import videoOne from '../../../../movies/brand/recomendaded/videoUno.mp4'
import videoTwo from '../../../../movies/brand/recomendaded/videoDos.mp4'
import videoThree from '../../../../movies/brand/recomendaded/videoTres.mp4'
import videoFour from '../../../../movies/brand/recomendaded/videoCuatro.mp4'
import videoFive from '../../../../movies/brand/recomendaded/videoCinco.mp4'
import RecommendedProductsCarousel from './components/RecommendedProductsCarousel'
import RecommendedVideoBlock from './components/RecommendedVideoBlock'
import Reveal from '../../../../components/ux/Reveal'

const RECOMMENDED_PRODUCTS = OUTLET_PRODUCTS_ON_SALE.slice(0, 6).map((product, index) => ({
  ...product,
  id: `dark-recommended-${product.id}-${index}`,
  brand: 'DARK',
  brandType: 'TIENDA OFICIAL',
  badge: { label: 'Recomendado', variant: 'recommended' },
}))

const VIDEOS = [videoOne, videoTwo, videoThree, videoFour, videoFive]

export default function RecomendadedSection() {
  return (
    <section id="recomendados" aria-labelledby="recommended-title" className="bg-white pb-16 pt-16 text-dark-950 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-2">
        <Reveal effect="rise" className="mb-8 flex items-end justify-between gap-6 border-b border-dark-200 pb-5 lg:mb-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-dark-red">Selección de la tienda</p>
            <h2 id="recommended-title" className="mt-2 font-display text-4xl uppercase leading-none tracking-[-0.05em] sm:text-5xl">Recomendados</h2>
          </div>
          <p className="hidden whitespace-nowrap text-right text-sm font-light text-dark-500 lg:block">Piezas elegidas por DARK para construir un look con identidad.</p>
        </Reveal>

        <Reveal effect="scale" delay={100} className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-stretch lg:gap-6">
          <div className="min-w-0 lg:h-[39rem]"><RecommendedProductsCarousel products={RECOMMENDED_PRODUCTS} /></div>
          <RecommendedVideoBlock videos={VIDEOS} className="mx-auto max-w-[22rem] lg:mx-0 lg:h-[39rem] lg:max-w-none" />
        </Reveal>
      </div>
    </section>
  )
}
