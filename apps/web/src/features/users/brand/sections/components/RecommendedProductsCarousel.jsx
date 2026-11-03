import { useState } from 'react'
import CarouselControlButton from '../../../../../components/ui/buttons/CarouselControlButton'
import ProductCard from '../../../../../components/ui/cards/ProductCard'
import InfiniteMarquee from '../../../../../components/ux/InfiniteMarquee'

export default function RecommendedProductsCarousel({ products }) {
  const [motion, setMotion] = useState({ speed: 50, direction: 'right' })
  const resetMotion = () => setMotion({ speed: 50, direction: 'right' })
  const accelerate = (direction) => setMotion({ speed: 300, direction })
  const pauseMotion = () => setMotion((current) => ({ ...current, speed: 0 }))

  return (
    <>
      <div className="overflow-x-auto overscroll-x-contain scroll-smooth py-4 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max snap-x snap-mandatory gap-4 pr-4">
          {products.map((product) => (
            <div key={product.id} className="w-[80vw] shrink-0 snap-start">
              <ProductCard product={product} compact priceAccent />
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden lg:block">
        <InfiniteMarquee speed={motion.speed} direction={motion.direction} gapClass="gap-4 pr-4" className="py-4">
          {products.map((product) => (
            <div key={product.id} className="w-64 shrink-0">
              <ProductCard product={product} compact priceAccent onCardMouseEnter={pauseMotion} onCardMouseLeave={resetMotion} onCardFocus={pauseMotion} onCardBlur={resetMotion} />
            </div>
          ))}
        </InfiniteMarquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-dark-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-dark-white to-transparent" />
        <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2"><CarouselControlButton direction="left" onHover={() => accelerate('left')} onLeave={resetMotion} /></div>
        <div className="absolute right-4 top-1/2 z-20 -translate-y-1/2"><CarouselControlButton direction="right" onHover={() => accelerate('right')} onLeave={resetMotion} /></div>
      </div>
    </>
  )
}
