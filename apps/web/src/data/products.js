import outletOne from '../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../assets/Sections/homespages/outlet/products/outletTres.webp'
import outletFour from '../assets/Sections/homespages/outlet/products/outletCuatro.webp'

export const badgesData = [
  { variant: 'descuento', label: 'Descuento' },
  { variant: 'nuevo', label: 'Nuevo drop' },
  { variant: 'obsequio', label: 'Obsequio' },
  { variant: 'recomendado', label: 'Recomendado' },
]

const templates = [
  { name: 'Hoodie edición aniversario', description: 'Felpa premium, caída amplia y una silueta hecha para todos los días.', image: outletOne, brand: 'DARK', colors: ['#080808', '#f5f5f3', '#491c25'], unavailableSizes: ['XL'] },
  { name: 'Camiseta oversize esencial', description: 'Algodón suave de alto gramaje con un corte amplio y limpio.', image: outletTwo, brand: 'AMERICAN EAGLE', colors: ['#121212', '#1f3653', '#d9d9d9'], unavailableSizes: ['XS', 'XXL'] },
  { name: 'Camiseta oversize oceánica', description: 'Silueta relajada y acabado azul profundo para un look urbano.', image: outletThree, brand: 'MONCLER FRIEND', colors: ['#080808', '#333333', '#491c25'], unavailableSizes: ['S'] },
  { name: 'Camiseta oversize Medusa', description: 'Algodón compacto, corte amplio y una actitud que se nota.', image: outletFour, brand: 'DYNAMO BRAND', colors: ['#080808', '#737373', '#f5f5f3'], unavailableSizes: ['L', 'XL'] },
]

export const productsData = Array.from({ length: 12 }, (_, index) => {
  const base = templates[index % templates.length]
  const badge = badgesData[index % badgesData.length]
  const price = 30000 + (index % 8) * 2000
  const originalPrice = index % 4 === 3 ? null : price + 22000
  return { ...base, id: `product-${index + 1}`, gender: ['unisex', 'mujer', 'hombre'][index % 3], name: `${base.name} ${String(index + 1).padStart(2, '0')}`, brandType: 'TIENDA OFICIAL', category: index % 4 === 0 ? 'chaquetas' : 'camisetas', price, originalPrice, discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0, badge, sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] }
})

export const outletProductsData = productsData
