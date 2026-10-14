import { Link, useParams } from 'react-router-dom'
import NavLayout from './layouts/navLayout'
import ImagesComponents from './components/imagesComponents'
import DescriptionComponents from './components/descriptionComponents'
import AdventageComponents from './components/adventageComponents'
import outletOne from '../../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../../assets/Sections/homespages/outlet/products/outletTres.webp'

const PRODUCT = {
  name: 'Nocturne Oversize Tee',
  category: 'Camiseta oversize',
  gender: 'Unisex',
  description: 'Una silueta amplia y precisa, construida para sostener el peso visual de cualquier look.',
  price: 125000,
  originalPrice: 170000,
  discount: 26,
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  unavailableSizes: ['XL'],
  colors: ['#080808', '#f5f5f3'],
  images: [outletOne, outletTwo, outletThree],
}

export default function Preview() {
  const { slug } = useParams()
  // TODO: Resolver el producto unitario real desde el catálogo usando este slug.

  return (
    <div className="min-h-screen bg-dark-white text-dark-950">
      <NavLayout />
      <main>
        <section className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 xl:px-16">
          <nav aria-label="Miga de pan" className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-wide text-dark-500 sm:mb-10 sm:text-[11px]">
            <Link to="/" className="text-dark-red transition-colors hover:text-dark-burgundy">Inicio</Link><span>/</span><Link to="/#coleccion" className="hover:text-dark-950">Todo el catálogo</Link><span>/</span><span>Camisetas</span><span>/</span><span className="text-dark-950">{slug?.replaceAll('-', ' ') || PRODUCT.name}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-12 xl:gap-16">
            <ImagesComponents images={PRODUCT.images} productName={PRODUCT.name} />
            <DescriptionComponents product={PRODUCT} />
          </div>
          <div className="my-14 h-px bg-dark-200 sm:my-20" />
          <AdventageComponents />
        </section>
      </main>
    </div>
  )
}
