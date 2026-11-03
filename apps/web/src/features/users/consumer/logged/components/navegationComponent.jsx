import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import presentationImage from '../../../../../assets/Componentes/NavegacionUsuario/Presentacion.png'
import shirtsImage from '../../../../../assets/Componentes/NavegacionUsuario/ImagenUno.webp'
import jacketsImage from '../../../../../assets/Componentes/NavegacionUsuario/ImagenDos.webp'
import pantsImage from '../../../../../assets/Componentes/NavegacionUsuario/ImagenTres.webp'
import shoesImage from '../../../../../assets/Componentes/NavegacionUsuario/ImagenCuatro.webp'
import allImage from '../../../../../assets/Componentes/NavegacionUsuario/ImagenCinco.webp'
import accessoriesImage from '../../../../../assets/Componentes/NavegacionUsuario/ImagenSeis.webp'

const HIGHLIGHTS = [['Últimos lanzamientos', 'nuevo'], ['Más vendidos', 'mas-vendidos'], ['Outlets', 'outlet'], ['Exclusivos', 'exclusivos'], ['Conjuntos', 'conjuntos'], ['Ofertas', 'ofertas'], ['Descuentos', 'descuentos'], ['Obsequios', 'obsequios']]
const REFERENCES = ['Underground', 'Gótico', 'Básico', 'Elegante', 'Old Money', 'Vintage', 'Deportivo', 'Casual']
const CATEGORIES = [['Camisas', 'camisetas', shirtsImage], ['Chaquetas', 'chaquetas', jacketsImage], ['Pantalones', 'pantalones', pantsImage], ['Zapatos', 'zapatos', shoesImage], ['Accesorios', 'accesorios', accessoriesImage], ['Ver todos', '', allImage]]
const ACCOUNT = [['Pedidos', '/account/orders'], ['Reportes', '/account/reports'], ['Métodos de pago', '/account/payment-methods'], ['Dirección de envío', '/account/shipping'], ['Configuración de cuenta', '/account/settings']]
const SECURITY = [['Términos y condiciones', '/legal#terminos-y-condiciones'], ['Políticas de privacidad', '/legal#politicas-de-privacidad'], ['Tratamiento de datos', '/legal#tratamiento-de-datos'], ['Ayuda', '/help']]

function MenuLink({ to, children, onClose }) {
  return <Link role="menuitem" to={to} onClick={onClose} className="inline-flex w-fit text-sm font-light leading-tight text-dark-600 transition-colors duration-200 hover:text-dark-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red">{children}</Link>
}

export default function NavegationComponent({ isOpen, onMouseEnter, onMouseLeave, onClose }) {
  return <>
    <button type="button" aria-label="Cerrar menú de usuario" onClick={onClose} className={`fixed inset-0 z-40 hidden cursor-default bg-black/35 backdrop-blur-sm transition-opacity duration-200 lg:block ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />
    <section role="menu" aria-label="Menú de usuario" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`fixed left-1/2 top-[178px] z-50 hidden w-[calc(100vw-48px)] max-w-[1500px] -translate-x-1/2 rounded-lg bg-white p-6 shadow-xl transition-all duration-200 ease-out lg:block ${isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none invisible translate-y-2 opacity-0'}`}>
      <div className="grid grid-cols-[0.95fr_0.9fr_1.25fr_1fr] gap-7">
        <div><h2 className="font-display text-sm font-black uppercase tracking-tight text-dark-950">Destacados</h2><div className="mt-5 flex flex-col gap-2.5">{HIGHLIGHTS.map(([label, filter]) => <MenuLink key={filter} to={`/catalog?filter=${filter}`} onClose={onClose}>{label}</MenuLink>)}</div><Link to="/catalog" onClick={onClose} className="group relative mt-5 block aspect-[5/4] overflow-hidden bg-dark-950"><img src={presentationImage} alt="Explora la navegación Darkshop" className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105" /></Link></div>
        <div><h2 className="font-display text-sm font-black uppercase tracking-tight text-dark-950">Referencia</h2><div className="mt-5 flex flex-col gap-2.5">{REFERENCES.map((label) => <MenuLink key={label} to={`/catalog?ref=${encodeURIComponent(label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(' ', '-'))}`} onClose={onClose}>{label}</MenuLink>)}</div></div>
        <div className="flex flex-col gap-1.5">{CATEGORIES.map(([title, category, image]) => <Link role="menuitem" to={category ? `/catalog?category=${category}` : '/catalog'} onClick={onClose} key={title} aria-label={title} className="group relative block h-24 overflow-hidden bg-dark-950"><img src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]" /></Link>)}</div>
        <div><h2 className="font-display text-sm font-black uppercase tracking-tight text-dark-950">Cuenta</h2><div className="mt-5 flex flex-col gap-2.5">{ACCOUNT.map(([label, to]) => <MenuLink key={label} to={to} onClose={onClose}>{label}</MenuLink>)}<Link role="menuitem" to="/expired" onClick={onClose} className="mt-1 inline-flex w-fit items-center gap-5 text-sm font-medium text-dark-red transition-colors duration-200 hover:text-dark-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red">Cerrar sesión <ArrowRight size={18} /></Link></div><div className="mt-7"><h2 className="font-display text-sm font-black uppercase tracking-tight text-dark-950">Seguridad</h2><div className="mt-5 flex flex-col gap-2.5">{SECURITY.map(([label, to]) => <MenuLink key={label} to={to} onClose={onClose}>{label}</MenuLink>)}</div></div></div>
      </div>
    </section>
  </>
}
