import imageOne from '../../../assets/Brand/category/categoryUno.webp'
import imageTwo from '../../../assets/Brand/category/categoryDos.webp'
import imageThree from '../../../assets/Brand/category/categoryTres.webp'
import imageFour from '../../../assets/Brand/category/categoryCuatro.webp'
import imageFive from '../../../assets/Brand/category/categoryCinco.webp'

const GROUPS = [
  { id: 'camisetas', label: 'Camisetas', names: ['Estampadas', 'Básicas', 'Difuminadas', 'Filosóficas', 'Multicolor', 'Angelicales', 'Overside'] },
  { id: 'pantalones', label: 'Pantalones', names: ['Cargo', 'Rectos', 'Denim', 'Jogger', 'Wide Leg'] },
  { id: 'zapatos', label: 'Zapatos', names: ['Urbanos', 'Sneakers'] },
  { id: 'chaquetas', label: 'Chaquetas', names: ['Bomber', 'Denim Chaquetas', 'Ligeras', 'Oversize Chaquetas', 'Técnicas', 'Statement'] },
  { id: 'gorras', label: 'Gorras', names: ['6 Paneles', 'Snapback', 'Bordadas', 'Minimal', 'Gráficas', 'Daily', 'Edición Dark'] },
  { id: 'ofertas', label: 'Ofertas', names: ['Últimas tallas', 'Precio especial', 'Fin de drop'] },
  { id: 'promociones', label: 'Promociones', names: ['Combina y ahorra', 'Drop de temporada', 'Pack esencial', 'Precio de lanzamiento', 'Selección limitada'] },
  { id: 'obsequios', label: 'Obsequios', names: ['Para ellos', 'Para ellas', 'Accesorios', 'Regalo Dark', 'Favoritos', 'Edición especial', 'Detalle único'] },
]

const images = [imageOne, imageTwo, imageThree, imageFour, imageFive]
const slugify = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const copy = {
  estampadas: ['Gráficos que cuentan historias sin pedir permiso.', 'Ilustraciones y mensajes que llevan la identidad DARK al frente y al reverso.'],
  basicas: ['Los esenciales construidos para durar.', 'Prendas limpias y versátiles para sostener cualquier combinación.'],
  difuminadas: ['Tonos en transición para salir de lo predecible.', 'Degradados y acabados visuales que convierten cada pieza en una composición distinta.'],
  filosoficas: ['Ideas y símbolos que se llevan puestos.', 'Una selección que mezcla pensamiento, gráfica y actitud urbana.'],
  multicolor: ['Contrastes que transforman lo esencial.', 'Color y textura para crear piezas que no pasan desapercibidas.'],
  angelicales: ['Diseños inspirados en lo celestial, creados con carácter.', 'Figuras y símbolos inspirados en una estética urbana con identidad propia.'],
  overside: ['Proporciones amplias para moverse con libertad.', 'Siluetas generosas y detalles precisos que definen una presencia relajada.'],
}

export const COLLECTION_CATEGORIES = GROUPS.map(({ id, label }) => ({ id, label }))
export const COLLECTIONS = GROUPS.flatMap((group) => group.names.map((label, index) => {
  const slug = slugify(label)
  return {
    slug,
    label,
    category: group.id,
    categoryLabel: group.label,
    image: images[index % images.length],
    tagline: copy[slug]?.[0] ?? `${label}: una colección con identidad DARK.`,
    description: copy[slug]?.[1] ?? 'Piezas de estilo urbano creadas para expresar tu identidad y encontrar tu propia forma de vestir.',
  }
})).map((collection, index) => ({ ...collection, index: String(index + 1).padStart(2, '0') }))
