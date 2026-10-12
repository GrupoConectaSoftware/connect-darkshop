import CarouselHero from '../../../../../components/ux/CarouselHero'
import desktopOne from '../../../../../assets/Sections/homespages/introduction/escritorio/imagesIntroductionUno.webp'
import desktopTwo from '../../../../../assets/Sections/homespages/introduction/escritorio/imagesIntroductionDos.webp'
import desktopThree from '../../../../../assets/Sections/homespages/introduction/escritorio/imagesIntroductionTres.webp'
import mobileOne from '../../../../../assets/Sections/homespages/introduction/mobile/imagesIntroductionUno.webp'
import mobileTwo from '../../../../../assets/Sections/homespages/introduction/mobile/imagesIntroductionDos.webp'
import mobileThree from '../../../../../assets/Sections/homespages/introduction/mobile/imagesIntroductionTres.webp'

const HERO_IMAGES = [
  { src: desktopOne, mobileSrc: mobileOne, alt: 'Campaña Darkshop Ropa Negra' },
  { src: desktopTwo, mobileSrc: mobileTwo, alt: 'Campaña Darkshop colección urbana' },
  { src: desktopThree, mobileSrc: mobileThree, alt: 'Campaña Darkshop nueva colección' },
]

export default function IntroductionSection() {
  return (
    <CarouselHero
      id="nosotros"
      images={HERO_IMAGES}
      className="h-[calc(100svh-4rem)] min-h-112 bg-dark-950 lg:h-[calc(100svh-5rem)]"
    />
  )
}
