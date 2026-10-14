import outletOne from '../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../assets/Sections/homespages/outlet/products/outletTres.webp'
import outletFour from '../../../assets/Sections/homespages/outlet/products/outletCuatro.webp'

const PRODUCT_TEMPLATES = [
  { name: 'Hoodie edición aniversario', description: 'Felpa premium, caída amplia y una silueta hecha para todos los días.', image: outletOne, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#f5f5f3', '#491c25'], unavailableSizes: ['XL'] },
  { name: 'Camiseta oversize esencial', description: 'Algodón suave de alto gramaje con un corte amplio y limpio.', image: outletTwo, brand: 'AMERICAN EAGLE', brandType: 'TIENDA OFICIAL', colors: ['#121212', '#1f3653', '#d9d9d9'], unavailableSizes: ['XS', 'XXL'] },
  { name: 'Camiseta oversize oceánica', description: 'Silueta relajada y acabado azul profundo para un look urbano.', image: outletThree, brand: 'MONCLER FRIEND', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#333333', '#491c25'], unavailableSizes: ['S'] },
  { name: 'Camiseta oversize Medusa', description: 'Algodón compacto, corte amplio y una actitud que se nota.', image: outletFour, brand: 'DYNAMO BRAND', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#737373', '#f5f5f3'], unavailableSizes: ['L', 'XL'] },
]

const BADGES = [
  { variant: 'descuento', label: 'Descuento' },
  { variant: 'nuevo', label: 'Nuevo drop' },
  { variant: 'obsequio', label: 'Obsequio' },
  { variant: 'comentado', label: 'Comentado' },
  null,
]

const PRODUCT_CATALOG = Array.from({ length: 30 }, (_, index) => {
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

export const OUTLET_PRODUCTS_ON_SALE = PRODUCT_CATALOG.filter((product) => product.price < 50000)
