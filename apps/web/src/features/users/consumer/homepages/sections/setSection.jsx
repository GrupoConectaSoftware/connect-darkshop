import setsImage from '../../../../../assets/Sections/homespages/sets/ImagesSets.webp'
import ImageZoom from '../../../../../components/ux/ImageZoom'
import Reveal from '../../../../../components/ux/Reveal'
import BrandMarquee from '../../../../../components/ux/BrandMarquee'
import { MARKETPLACE_BRANDS } from '../../../../../components/ux/brandMarqueeData'

export default function SetSection({ selectedBrand = '', onBrandSelect = () => {} }) {
  return (
    <section id="conjuntos" className="sets-section">
      <p className="sr-only">Filtra el Outlet por marca: {MARKETPLACE_BRANDS.join(', ')}.</p>
      <BrandMarquee interactive selectedBrand={selectedBrand} onBrandSelect={onBrandSelect} />

      <div className="sets-section__content">
        <ImageZoom className="w-full">
          <img
            src={setsImage}
            alt="Conjuntos Darkshop: prendas coordinadas para crear un look completo"
            className="sets-section__image"
          />
        </ImageZoom>

        <Reveal as="a" href="#coleccion" effect="fade" delay={120} className="sets-section__link">
          <span aria-hidden="true" />
          <span>Si deseas ver toda la colección de conjuntos disponibles <strong>Pulsa aquí</strong></span>
          <span aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}
