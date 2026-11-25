import promotionUno from '../assets/Promotions/Catalog/promotionUno.webp'
import promotionDos from '../assets/Promotions/Catalog/promotionDos.webp'
import promotionTres from '../assets/Promotions/Catalog/promotionTres.webp'
import promotionCuatro from '../assets/Promotions/Catalog/promotionCuatro.webp'
import promotionCinco from '../assets/Promotions/Catalog/promotionCinco.webp'

export const promotionsData = [
  {
    id: 'nova-district',
    image: promotionUno,
    title: 'Nueva colección',
    subtitle: 'Estilo urbano / casual',
    offer: 'Hasta 30% OFF',
    cta: 'Ver colección',
    href: '/catalog?filter=promociones',
  },
  {
    id: 'drop-urbano',
    image: promotionDos,
    title: 'Nuevo drop',
    subtitle: 'Piezas seleccionadas',
    offer: 'Descubre lo nuevo',
    cta: 'Ver promociones',
    href: '/catalog?filter=promociones',
  },
  {
    id: 'seleccion-dark',
    image: promotionTres,
    title: 'Selección Dark',
    subtitle: 'Esenciales con identidad',
    offer: 'Ofertas especiales',
    cta: 'Explorar selección',
    href: '/catalog?filter=promociones',
  },
  {
    id: 'streetwear',
    image: promotionCuatro,
    title: 'Streetwear premium',
    subtitle: 'Encuentra tu próximo look',
    offer: 'Unidades seleccionadas',
    cta: 'Ver colección',
    href: '/catalog?filter=promociones',
  },
  {
    id: 'ultimas-unidades',
    image: promotionCinco,
    title: 'Últimas unidades',
    subtitle: 'Tu estilo, a tu manera',
    offer: 'Aprovecha el drop',
    cta: 'Comprar ahora',
    href: '/catalog?filter=promociones',
  },
]

export default promotionsData
