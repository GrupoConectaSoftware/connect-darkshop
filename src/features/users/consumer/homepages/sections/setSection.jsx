import setsImage from '../../../../../assets/Sections/homespages/sets/ImagesSets.webp'
import ImageZoom from '../../../../../ux/ImageZoom'
import Reveal from '../../../../../ux/Reveal'

const OUTLET_BRANDS = ['DARK', 'AMERICAN EAGLE', 'MONCLER FRIEND', 'DYNAMO BRAND']

const SECOND_ROW_ORDER = [...OUTLET_BRANDS].reverse()

function MarqueeRow({ brands, selectedBrand, onBrandSelect, reverse = false }) {
  return (
    <div className={`sets-marquee ${reverse ? 'sets-marquee--reverse' : ''}`}>
      <div className="sets-marquee__track">
        {[0, 1].map((group) => (
          <div className="sets-marquee__group" key={group} aria-hidden={group === 1}>
            {brands.map((brand, index) => (
              <button
                key={`${brand}-${index}`}
                type="button"
                aria-label={`Filtrar productos de ${brand}`}
                aria-pressed={selectedBrand === brand}
                tabIndex={group === 0 ? 0 : -1}
                className={selectedBrand === brand ? 'is-selected' : ''}
                onClick={() => onBrandSelect(selectedBrand === brand ? '' : brand)}
              >
                {brand}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SetSection({ selectedBrand = '', onBrandSelect = () => {} }) {
  return (
    <section id="conjuntos" className="sets-section">
      <p className="sr-only">Filtra el Outlet por marca: {OUTLET_BRANDS.join(', ')}.</p>

      <MarqueeRow brands={OUTLET_BRANDS} selectedBrand={selectedBrand} onBrandSelect={onBrandSelect} />
      <MarqueeRow brands={SECOND_ROW_ORDER} selectedBrand={selectedBrand} onBrandSelect={onBrandSelect} reverse />

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
