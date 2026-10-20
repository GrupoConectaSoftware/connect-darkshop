import bannerVideo from '../../../../movies/brand/banner/videoBanner.mp4'
import BrandMarquee from '../../../../components/ux/BrandMarquee'
import { DARK_PRODUCT_BRANDS } from '../../../../components/ux/brandMarqueeData'
import Reveal from '../../../../components/ux/Reveal'

export default function ReferencesSection() {
  return (
    <section aria-label="Marcas y video de campaña DARK" className="w-full">
  
      <Reveal effect="clip">
        <video
          src={bannerVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="block h-[80vh] w-full object-cover"
        />
      </Reveal>
      <Reveal effect="fade" delay={100} aria-hidden="true" className="w-full overflow-hidden bg-white py-6 sm:py-8 lg:py-10">
        <BrandMarquee brands={DARK_PRODUCT_BRANDS} />
      </Reveal>
    </section>
    
  )
}
