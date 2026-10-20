import { MARKETPLACE_BRANDS } from './brandMarqueeData'
import './BrandMarquee.css'

function MarqueeRow({ brands, reverse, interactive, selectedBrand, onBrandSelect }) {
  return (
    <div className={`sets-marquee ${reverse ? 'sets-marquee--reverse' : ''}`}>
      <div className="sets-marquee__track">
        {[0, 1].map((group) => (
          <div className="sets-marquee__group" key={group} aria-hidden={group === 1}>
            {brands.map((brand, index) => (
              interactive ? (
                <button
                  key={`${brand}-${index}`}
                  type="button"
                  aria-label={`Filtrar productos de ${brand}`}
                  aria-pressed={selectedBrand === brand}
                  tabIndex={group === 0 ? 0 : -1}
                  className={`cursor-pointer ${selectedBrand === brand ? 'is-selected' : ''}`}
                  onClick={() => onBrandSelect(selectedBrand === brand ? '' : brand)}
                >
                  {brand}
                </button>
              ) : (
                <span key={`${brand}-${index}`} className="cursor-default transition-colors hover:text-dark-red">{brand}</span>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BrandMarquee({ brands = MARKETPLACE_BRANDS, interactive = false, selectedBrand = '', onBrandSelect = () => {} }) {
  const reverseBrands = [...brands].reverse()

  return (
    <>
      <MarqueeRow brands={brands} selectedBrand={selectedBrand} onBrandSelect={onBrandSelect} interactive={interactive} />
      <MarqueeRow brands={reverseBrands} selectedBrand={selectedBrand} onBrandSelect={onBrandSelect} interactive={interactive} reverse />
    </>
  )
}
