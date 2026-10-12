import OutletCarousel from '../../../../../components/ux/OutletCarousel'
import InfiniteBanner from '../../../../../components/ux/InfiniteBanner'
import Reveal from '../../../../../components/ux/Reveal'
import bannerOutlet from '../../../../../assets/Sections/homespages/outlet/banner/bannerOutlet.webp'
import outletOne from '../../../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../../../assets/Sections/homespages/outlet/products/outletTres.webp'
import outletFour from '../../../../../assets/Sections/homespages/outlet/products/outletCuatro.webp'
import sectionOutlet from '../../../../../assets/Sections/homespages/outlet/sections/sectionOutlet.webp'
import filterByGender from '../../../../../utils/filterByGender'

const BANNER_DIRECTION = 'left'

const PRODUCT_TEMPLATES = [
  { name: 'Hoodie edición aniversario', description: 'Felpa premium, caída amplia y una silueta hecha para todos los días.', image: outletOne, brand: 'DARK', brandType: 'PRESENCIAL', colors: ['#080808', '#f5f5f3', '#491c25'], unavailableSizes: ['XL'] },
  { name: 'Camiseta oversize esencial', description: 'Algodón suave de alto gramaje con un corte amplio y limpio.', image: outletTwo, brand: 'AMERICAN EAGLE', brandType: 'ONLINE', colors: ['#121212', '#1f3653', '#d9d9d9'], unavailableSizes: ['XS', 'XXL'] },
  { name: 'Camiseta oversize oceánica', description: 'Silueta relajada y acabado azul profundo para un look urbano.', image: outletThree, brand: 'MONCLER FRIEND', brandType: 'PRESENCIAL', colors: ['#080808', '#333333', '#491c25'], unavailableSizes: ['S'] },
  { name: 'Camiseta oversize Medusa', description: 'Algodón compacto, corte amplio y una actitud que se nota.', image: outletFour, brand: 'DYNAMO BRAND', brandType: 'ONLINE', colors: ['#080808', '#737373', '#f5f5f3'], unavailableSizes: ['L', 'XL'] },
]

const BADGES = [
  { variant: 'descuento', label: 'Descuento' },
  { variant: 'nuevo', label: 'Nuevo drop' },
  { variant: 'obsequio', label: 'Obsequio' },
  { variant: 'comentado', label: 'Comentado' },
  null,
]

const OUTLET_PRODUCTS = Array.from({ length: 30 }, (_, index) => {
  const template = PRODUCT_TEMPLATES[index % PRODUCT_TEMPLATES.length]
  const badge = BADGES[index % BADGES.length]
  const price = 30000 + (index % 8) * 2000
  const originalPrice = badge ? price + 22000 : null

  return {
    ...template,
    id: index + 1,
    gender: ['unisex', 'mujer', 'hombre', 'unisex'][index % 4],
    name: `${template.name} ${String(index + 1).padStart(2, '0')}`,
    price,
    originalPrice,
    discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
    badge,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }
})

const OUTLET_PRODUCTS_ON_SALE = OUTLET_PRODUCTS.filter((product) => product.price < 50000)
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
        <div className="px-3 sm:px-5 lg:px-6">
          <OutletCarousel key={selectedBrand || 'all-brands'} products={products} />
        </div>
      ) : (
        <p className="px-6 py-12 text-center text-base text-dark-500">No hay productos de esta marca en Outlet por ahora.</p>
      )}

      <div className="mt-7"><InfiniteBanner imageSrc={bannerOutlet} speed={80} direction={BANNER_DIRECTION} /></div>
    </section>
  )
}
