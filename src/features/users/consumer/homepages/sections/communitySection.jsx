import { Lock, Package, Settings, Truck } from 'lucide-react'
import BenefitCard from '../../../../../components/ui/cards/BenefitCard'
import ImageZoom from '../../../../../ux/ImageZoom'
import Reveal from '../../../../../ux/Reveal'
import communityImage from '../../../../../assets/Sections/homespages/community/imagesCommunity.webp'

const NAV_ITEMS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Los productos', href: '#productos' },
  { label: 'Comunidad', href: '#comunidad' },
]

const BENEFITS = [
  { icon: Truck, title: 'Envíos a todo el país', subtitle: 'Aseguramos cada compra' },
  { icon: Lock, title: 'Pagos seguros', subtitle: 'Múltiples opciones de pago' },
  { icon: Package, title: 'Cambios y devoluciones', subtitle: 'Tienes hasta cambios sin costo' },
  { icon: Settings, title: 'Calidad garantizada', subtitle: 'Garantía en cada prenda' },
]

export default function CommunitySection() {
  return (
    <section id="comunidad" className="bg-dark-white text-dark-950">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:px-10 lg:py-20">
        <Reveal className="max-w-3xl">
          <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] text-dark-950 sm:text-4xl lg:text-5xl">Bienvenido a la Darkshop</h2>
          <p className="mt-6 text-base leading-relaxed text-dark-600 sm:text-lg">DarkShop reúne prendas cuidadosamente seleccionadas para personas que entiendan el vestir de negro va más allá de una tendencia. Nuestra colección está diseñada para combinar entre sí, facilitando la creación de looks completos con un estilo limpio, urbano y atemporal.</p>
          <p className="mt-4 text-base leading-relaxed text-dark-600 sm:text-lg">Explora camisetas, hoodies, pantalones, accesorios y nuevos drops. Descubre piezas pensadas para durar, combinar y representar tu esencia.</p>
        </Reveal>

        <nav aria-label="Navegación de comunidad" className="flex flex-col gap-3 self-start text-left lg:items-end lg:text-right">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="text-xs font-medium uppercase tracking-widest text-dark-500 transition-colors hover:text-dark-950 sm:text-sm">{item.label}</a>
          ))}
        </nav>
      </div>

      <ImageZoom className="w-full">
        <img src={communityImage} alt="Comunidad Darkshop" className="block h-auto w-full object-cover" />
      </ImageZoom>

      <div className="bg-dark-950">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 divide-y divide-dark-700 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {BENEFITS.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 90} className="h-full">
              <BenefitCard
                {...benefit}
                className={index % 2 === 1 ? 'sm:border-l sm:border-dark-700 lg:border-l-0' : ''}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
