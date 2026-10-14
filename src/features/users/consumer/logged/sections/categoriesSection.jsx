import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import jacketsImage from '../../../../../assets/Sections/homespages/categories/categorieChaqueta.webp'
import shoesImage from '../../../../../assets/Sections/homespages/categories/categorieZapatos.webp'
import accessoriesImage from '../../../../../assets/Sections/homespages/categories/categorieAccesorios.webp'
import pantsImage from '../../../../../assets/Sections/homespages/categories/categoriePantalones.webp'
import teesImage from '../../../../../assets/Sections/homespages/categories/categorieCamisetas.webp'

const CATEGORIES = [
  ['Camisetas', teesImage], ['Chaquetas', jacketsImage], ['Pantalones', pantsImage], ['Zapatos', shoesImage], ['Accesorios', accessoriesImage],
]

export default function CategoriesSection() {
  return <section id="categorias" className="mx-auto mt-16 w-full max-w-[1600px] px-6 sm:mt-20 sm:px-10 lg:mt-24 lg:px-16"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-red">Encuentra tu estilo</p><h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-dark-950 sm:text-5xl">Categorías</h2></div><Link to="/catalog" className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wider text-dark-700 hover:text-dark-red sm:inline-flex">Ver catálogo<ArrowUpRight size={16} /></Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{CATEGORIES.map(([name, image]) => <Link key={name} to={`/catalog?category=${encodeURIComponent(name.toLowerCase())}`} className="group relative aspect-[4/5] overflow-hidden bg-dark-200"><img src={image} alt={name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" /><span className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white"><span className="font-display text-lg font-bold uppercase sm:text-xl">{name}</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span></Link>)}</div></section>
}
