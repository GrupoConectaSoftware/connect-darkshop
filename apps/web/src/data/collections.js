import imageOne from '../assets/Brand/category/categoryUno.webp'
import imageTwo from '../assets/Brand/category/categoryDos.webp'
import imageThree from '../assets/Brand/category/categoryTres.webp'
import imageFour from '../assets/Brand/category/categoryCuatro.webp'
import imageFive from '../assets/Brand/category/categoryCinco.webp'

const groups = [{ id: 'camisetas', label: 'Camisetas', names: ['Estampadas', 'Básicas', 'Difuminadas', 'Filosóficas', 'Multicolor', 'Angelicales', 'Overside'] }, { id: 'pantalones', label: 'Pantalones', names: ['Cargo', 'Rectos', 'Denim', 'Jogger', 'Wide Leg'] }, { id: 'zapatos', label: 'Zapatos', names: ['Urbanos', 'Sneakers'] }, { id: 'chaquetas', label: 'Chaquetas', names: ['Bomber', 'Denim Chaquetas', 'Ligeras', 'Oversize Chaquetas', 'Técnicas', 'Statement'] }, { id: 'gorras', label: 'Gorras', names: ['6 Paneles', 'Snapback', 'Bordadas', 'Minimal', 'Gráficas', 'Daily', 'Edición Dark'] }, { id: 'ofertas', label: 'Ofertas', names: ['Últimas tallas', 'Precio especial', 'Fin de drop'] }, { id: 'promociones', label: 'Promociones', names: ['Combina y ahorra', 'Drop de temporada', 'Pack esencial', 'Precio de lanzamiento', 'Selección limitada'] }, { id: 'obsequios', label: 'Obsequios', names: ['Para ellos', 'Para ellas', 'Accesorios', 'Regalo Dark', 'Favoritos', 'Edición especial', 'Detalle único'] }]
const images = [imageOne, imageTwo, imageThree, imageFour, imageFive]
const slugify = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const collectionCategoriesData = groups.map(({ id, label }) => ({ id, label }))
export const collectionsData = groups.flatMap((group) => group.names.map((label, position) => ({ id: slugify(label), slug: slugify(label), label, category: group.id, categoryLabel: group.label, image: images[position % images.length], tagline: `${label}: una colección con identidad DARK.`, description: 'Piezas de estilo urbano creadas para expresar tu identidad y encontrar tu propia forma de vestir.' }))).map((collection, index) => ({ ...collection, index: String(index + 1).padStart(2, '0') }))
