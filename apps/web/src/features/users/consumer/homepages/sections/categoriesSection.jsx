import CategoryCard from '../../../../../components/ui/cards/CategoryCard'
import Reveal from '../../../../../components/ux/Reveal'
import jacketsImage from '../../../../../assets/Sections/homespages/categories/categorieChaqueta.webp'
import shoesImage from '../../../../../assets/Sections/homespages/categories/categorieZapatos.webp'
import accessoriesImage from '../../../../../assets/Sections/homespages/categories/categorieAccesorios.webp'
import pantsImage from '../../../../../assets/Sections/homespages/categories/categoriePantalones.webp'
import teesImage from '../../../../../assets/Sections/homespages/categories/categorieCamisetas.webp'

const NAV_ITEMS = [
  { label: 'Sobre', href: '#nosotros' },
  { label: 'Los productos', href: '#coleccion' },
  { label: 'Comunidad', href: '#comunidad' },
]

const CATEGORIES = [
  {
    id: 1,
    name: 'Chaquetas',
    itemsCount: 34,
    description: 'Chaquetas confeccionadas para quienes entienden que el estilo está en la simplicidad.',
    image: jacketsImage,
  },
  {
    id: 2,
    name: 'Zapatos',
    itemsCount: 28,
    description: 'Calzado minimalista y versátil para cada ocasión.',
    image: shoesImage,
  },
  {
    id: 3,
    name: 'Accesorios',
    itemsCount: 42,
    description: 'Complementos que definen y elevan cualquier outfit.',
    image: accessoriesImage,
  },
  {
    id: 4,
    name: 'Pantalones',
    itemsCount: 19,
    description: 'Cortes precisos y tejidos que acompañan tu movimiento.',
    image: pantsImage,
  },
  {
    id: 5,
    name: 'Camisetas',
    itemsCount: 25,
    description: 'Prendas esenciales que acompañan todos tus días.',
    image: teesImage,
  },
]

export default function CategoriesSection() {
  return (
    <section id="categorias" className="bg-dark-white text-dark-950">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:px-10 lg:py-20">
        <Reveal className="max-w-4xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-dark-red sm:text-sm">Categorías</p>
          <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.045em] text-dark-950 sm:text-4xl lg:text-5xl">Encuentra la silueta ideal para ti</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-dark-600 sm:text-lg">No diseñamos para una temporada. Diseñamos para una identidad. Elige las prendas que te acompañarán durante años.</p>
        </Reveal>

        <Reveal as="nav" effect="fade" delay={120} aria-label="Navegación de categorías" className="flex flex-col gap-3 self-start text-left lg:items-end lg:text-right">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="text-xs font-medium uppercase tracking-widest text-dark-500 transition-colors hover:text-dark-950 sm:text-sm">{item.label}</a>
          ))}
        </Reveal>
      </div>

      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-3 pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-5 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="w-[82vw] shrink-0 snap-start sm:w-[48vw] lg:w-auto lg:min-w-0">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </section>
  )
}
