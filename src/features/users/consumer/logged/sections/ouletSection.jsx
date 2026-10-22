import { Link } from 'react-router-dom'
import OutletCarousel from '../../../../../components/ux/OutletCarousel'
import InfiniteBanner from '../../../../../components/ux/InfiniteBanner'
import Reveal from '../../../../../components/ux/Reveal'
import bannerOutlet from '../../../../../assets/Sections/homespages/outlet/banner/bannerOutlet.webp'
import sectionOutlet from '../../../../../assets/Sections/homespages/outlet/sections/sectionOutlet.webp'
import filterByGender from '../../../../../utils/filterByGender'
import { OUTLET_PRODUCTS_ON_SALE } from '../../../../../components/ui/cards/productCardData'

const BANNER_DIRECTION = 'left'

export default function OutletSection({ selectedBrand = '', gender = null }) {
  const brandProducts = selectedBrand
    ? OUTLET_PRODUCTS_ON_SALE.filter((product) => product.brand === selectedBrand)
    : OUTLET_PRODUCTS_ON_SALE
  const products = filterByGender(brandProducts, gender)

  return (
    <section id="coleccion" className="overflow-hidden bg-dark-white text-dark-950">
      <div className="px-5 py-10 sm:px-8 sm:py-12 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 lg:px-12 lg:py-14 xl:gap-20">
        <Reveal className="max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-dark-red sm:text-base">Ofertas exclusivas</p>
          <h2 className="text-[clamp(1.7rem,8vw,3.6rem)] font-black uppercase leading-none tracking-[-0.065em] lg:text-[clamp(2.4rem,3.55vw,4rem)]">
            <span className="block whitespace-nowrap text-dark-300">TODO BAJO</span>
            <span className="block whitespace-nowrap text-dark-950">POR MENOS A <span className="text-dark-burgundy">$50.000</span></span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-dark-600 sm:text-lg">Últimas unidades, samples, tallas únicas. Defectos cosméticos. Mismo algodón, mismo corte, fracción del precio. <strong className="block font-semibold text-dark-950">Cuando se agotan, no vuelven.</strong></p>
        </Reveal>
        <Reveal effect="fade" delay={150} className="relative mt-10 hidden lg:block lg:mt-0">
          <span aria-hidden="true" className="absolute -left-5 top-1/2 h-px w-12 -translate-y-1/2 bg-dark-burgundy/50" />
          <img src={sectionOutlet} alt="" className="ml-auto block w-full max-w-2xl object-cover" />
        </Reveal>
      </div>

      {products.length > 0 ? (
        <div className="px-3 sm:px-5 lg:px-6"><OutletCarousel key={selectedBrand || 'all-brands'} products={products} /></div>
      ) : <p className="px-6 py-12 text-center text-base text-dark-500">No hay productos de esta marca en Outlet por ahora.</p>}

      <div className="px-5 pb-8 sm:pb-10 lg:pb-12">
        <Link to="/catalog" className="sets-section__link" aria-label="Visualizar todo el Outlet en el catálogo">
          <span aria-hidden="true" /><span><strong>Visualizar todo el Outlet</strong></span><span aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-7"><InfiniteBanner imageSrc={bannerOutlet} speed={80} direction={BANNER_DIRECTION} /></div>
    </section>
  )
}
