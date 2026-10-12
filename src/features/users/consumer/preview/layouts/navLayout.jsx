import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, User } from 'lucide-react'
import logoDarkShop from '../../../../../assets/Logometria/LogoOficial.webp'
import HeartIcon from '../../../../../commons/ui/icons/commerce/HeartIcon'
import ShoppingBagIcon from '../../../../../commons/ui/icons/commerce/ShoppingBagIcon'
import MenuIcon from '../../../../../commons/ui/icons/navigation/MenuIcon'
import CloseIcon from '../../../../../commons/ui/icons/navigation/CloseIcon'
import MailIcon from '../../../../../commons/ui/icons/contact/MailIcon'
import PhoneIcon from '../../../../../commons/ui/icons/contact/PhoneIcon'
import InstagramIcon from '../../../../../commons/ui/icons/social/InstagramIcon'
import FacebookIcon from '../../../../../commons/ui/icons/social/FacebookIcon'
import TiktokIcon from '../../../../../commons/ui/icons/social/TiktokIcon'
import UserButton from '../../../../../components/ui/buttons/UserButton'
import SearchBar from '../../../../../components/ui/inputs/SearchBar'
import useHideOnScroll from '../../../../../hooks/useHideOnScroll'
import TextPromotionComponent from '../../homepages/components/TextPromotionComponent'
import AyudaComponent from '../../homepages/components/AyudaComponent'
import PqrComponent from '../../../../../commons/components/PqrComponent'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Outlet', href: '#coleccion' },
  { label: 'Comunidad', href: '#comunidad' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Conjuntos', href: '#conjuntos' },
]

// Mismo contenedor para las 3 barras del desktop -> todo alineado igual en lg, xl y 2xl
const DESKTOP_CONTAINER = 'mx-auto w-full max-w-[1600px] px-8'

// Posiciones del contador
const POS_ICON = 'right-0 top-0'                                    // favoritos / carrito
const POS_OUTLET = 'left-full top-0 ml-0.5 -translate-y-1/2'        // Outlet desktop: a la derecha de la palabra, sin tapar letras
function SocialLinks({ iconSize = 13, boxed = false }) {
  const linkClass = boxed
    ? 'grid h-9 w-9 place-items-center border-2 border-dark-950 text-dark-950 transition-colors hover:bg-dark-950 hover:text-white'
    : 'transition-colors hover:text-dark-red'

  return (
    <div className={`flex flex-row items-center ${boxed ? 'gap-3' : 'gap-2.5'}`}>
      <a href="#facebook" aria-label="Facebook" className={linkClass}><FacebookIcon size={iconSize} /></a>
      <a href="#instagram" aria-label="Instagram" className={linkClass}><InstagramIcon size={iconSize} /></a>
      <a href="#tiktok" aria-label="TikTok" className={linkClass}><TiktokIcon size={iconSize} /></a>
    </div>
  )
}

// Contador circular perfecto (rounded-full). Desktop h-4 w-4 / móvil h-3 w-3.
function Counter({ children, mobile = false, position = POS_ICON }) {
  const size = mobile ? 'h-3 w-3 text-[7px]' : 'h-4 w-4 text-[8px]'

  return (
    <span className={`absolute ${position} grid ${size} shrink-0 place-items-center rounded-full bg-dark-red font-bold leading-none text-dark-white`}>
      {children}
    </span>
  )
}

function DesktopNavLinks() {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`shrink-0 py-5 text-sm font-medium tracking-wide text-dark-600 transition-colors hover:text-dark-950 ${link.label === 'Outlet' ? 'mr-3' : ''}`}
        >
          {/* El span relative envuelve SOLO la palabra: el contador se ancla a ella */}
          <span className="relative inline-block">
            {link.label}
            {link.label === 'Outlet' && <Counter position={POS_OUTLET}>3</Counter>}
          </span>
        </a>
      ))}
    </>
  )
}

export default function NavLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isPqrOpen, setIsPqrOpen] = useState(false)
  const isHidden = useHideOnScroll(0.2)
  const closePqr = useCallback(() => setIsPqrOpen(false), [])

  // Bloquea el scroll del body mientras el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  // Cierra el menú con Escape o si la pantalla pasa a desktop (lg = 1024px)
  useEffect(() => {
    if (!isMobileMenuOpen) return undefined

    const handleKeyDown = (event) => { if (event.key === 'Escape') setIsMobileMenuOpen(false) }
    const handleResize = () => { if (window.innerWidth >= 1024) setIsMobileMenuOpen(false) }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileMenuOpen])

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      {/* Auto-hide: baja -> se esconde, sube -> aparece. Con el menú móvil abierto nunca se esconde */}
      <header className={`sticky top-0 z-50 w-full border-b border-dark-200 bg-dark-white text-dark-950 transition-transform duration-300 ease-in-out ${isHidden && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'}`}>
        {/* Barra negra */}
        <div className="bg-dark-950 text-dark-50">
          <div className={`${DESKTOP_CONTAINER} hidden h-9 items-center justify-between gap-6 lg:flex`}>
            <p className="shrink-0 text-sm text-white" style={{ fontStyle: 'italic', fontWeight: 700 }}>
              “El negro combina con todo. Nosotros también”
            </p>
            <div className="flex shrink-0 flex-row items-center gap-4 text-sm text-dark-200">
              <SocialLinks />
              <span className="h-3 w-px bg-dark-700" />
              <Link to="/register" className="transition-colors hover:text-dark-white">Trabaja con nosotros</Link>
              <button type="button" aria-haspopup="dialog" aria-expanded={isPqrOpen} onClick={() => setIsPqrOpen(true)} className="cursor-pointer transition-colors hover:text-dark-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white">Preguntas frecuentes</button>
              <span className="relative ml-2"><AyudaComponent /></span>
            </div>
          </div>
          <p className="flex h-8 items-center justify-start px-4 text-left text-[10px] font-semibold italic text-white sm:px-6 lg:hidden">“El negro combina con todo. Nosotros también”</p>
        </div>

        {/* Barra gris */}
        <div className="hidden bg-dark-200 text-dark-600 lg:block">
          <div className={`${DESKTOP_CONTAINER} flex h-9 flex-row items-center justify-between gap-6 font-medium text-dark-700`}>
            <div className="flex shrink-0 flex-row items-center gap-5 text-[11px]">
              <a href="mailto:darkshop@reportas.com" className="flex flex-row items-center gap-1.5 transition-colors hover:text-dark-950"><MailIcon size={13} /><span>darkshop@reportas.com</span></a>
              <a href="tel:6023993893" className="flex flex-row items-center gap-1.5 transition-colors hover:text-dark-950"><PhoneIcon size={13} /><span>(602) 399 3893</span></a>
            </div>
            <div className="shrink-0 text-[15px] font-medium"><TextPromotionComponent /></div>
          </div>
        </div>

        {/* Barra blanca principal */}
        <div className="hidden bg-dark-white lg:block">
          <div className={`${DESKTOP_CONTAINER} h-24`}>
            <div className="grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 xl:grid-cols-[auto_minmax(0,1fr)_20rem_auto] xl:gap-5 2xl:grid-cols-[auto_minmax(0,1fr)_22rem_auto] 2xl:gap-7">
              <div className="flex shrink-0 flex-row items-center">
                <a href="#inicio" className="shrink-0" aria-label="Darkshop inicio"><img src={logoDarkShop} alt="Darkshop" className="h-8 w-auto object-contain" /></a>
                {/* En lg (1024-1279px) se oculta para que los links no se aprieten; desde xl se ve igual en todos los tamaños */}
                <div className="ml-4 hidden flex-col border-l border-dark-200 pl-4 text-[8px] uppercase leading-relaxed tracking-widest text-dark-500 2xl:flex"><span>Moda</span><span>Cultura</span><span>Comunidad</span></div>
              </div>

              {/* gap fijo desde xl: sin variantes 2xl, se ve idéntico en pantallas grandes */}
              <nav className="flex xl:ml-5 min-w-0 flex-row items-center justify-start gap-4 xl:gap-5">
                <DesktopNavLinks />
              </nav>

              <div className="hidden min-w-0 xl:block">
                <SearchBar className="w-full" placeholder="Busca estilos, promociones o marcas de ropa" inputClassName="h-10 text-[14px]" />
              </div>

              <div className="flex shrink-0 flex-row items-center justify-end gap-3">
                <div className="flex flex-row items-center gap-1">
                  <button aria-label="Favoritos" className="relative grid size-10 cursor-pointer place-items-center text-dark-700 transition-colors hover:text-dark-red"><HeartIcon size={17} /><Counter>2</Counter></button>
                  <button aria-label="Carrito" className="relative grid size-10 cursor-pointer place-items-center text-dark-700 transition-colors hover:text-dark-red"><ShoppingBagIcon size={17} /><Counter>1</Counter></button>
                </div>
                <UserButton />
              </div>
            </div>
          </div>
        </div>

        {/* Barra móvil */}
        <div className="bg-dark-white lg:hidden">
          <div className="mx-auto flex h-14 max-w-[1600px] flex-row items-center justify-between px-4">
            <a href="#inicio" aria-label="Darkshop inicio"><img src={logoDarkShop} alt="Darkshop" className="h-8 w-auto object-contain" /></a>
            <div className="flex flex-row items-center gap-1">
              <button aria-label="Favoritos" className="relative grid h-9 w-9 cursor-pointer place-items-center text-dark-800"><HeartIcon size={19} /><Counter mobile>2</Counter></button>
              <button aria-label="Carrito" className="relative grid h-9 w-9 cursor-pointer place-items-center text-dark-800"><ShoppingBagIcon size={19} /><Counter mobile>1</Counter></button>
              <button aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen((open) => !open)} className="grid h-9 w-9 cursor-pointer place-items-center text-dark-950 transition-colors hover:text-dark-red focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-red">
                {isMobileMenuOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay (z-60) y drawer (z-70) FUERA del header: el header tiene transform y rompería el position:fixed */}
      <div className={`fixed inset-0 z-60 bg-dark-950/50 backdrop-blur-md transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`} onClick={closeMenu} aria-hidden="true" />

      <aside className={`fixed right-0 top-0 z-70 flex h-dvh w-[min(88vw,400px)] flex-col overflow-hidden bg-dark-white text-dark-950 shadow-2xl transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-label="Menú principal móvil">
        <img src={logoDarkShop} alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/3 w-[150%] max-w-none translate-x-[-17%] opacity-[0.018] blur-md" />
        {/* Header del drawer */}
        <div className="relative flex shrink-0 flex-row items-center justify-between px-6 pb-4 pt-6">
          <img src={logoDarkShop} alt="Darkshop" className="h-7 w-auto object-contain" />
          <button onClick={closeMenu} aria-label="Cerrar menú" className="grid h-9 w-9 cursor-pointer place-items-center text-dark-950 transition-colors hover:rotate-90 hover:text-dark-red focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-red motion-reduce:transform-none"><CloseIcon size={22} /></button>
        </div>

        <div className="relative mx-6 mt-2 shrink-0 bg-dark-50 px-4 py-3">
          <Link to="/login" onClick={closeMenu} className="inline-flex w-full items-center gap-3 text-sm text-dark-700 transition-colors hover:text-dark-red focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-red"><span className="grid size-9 place-items-center rounded-full bg-dark-950 text-dark-white"><User size={16} /></span><span><span className="block text-[10px] uppercase tracking-wide text-dark-500">Únete a la comunidad</span><span className="font-semibold text-dark-950">Iniciar sesión</span></span><ArrowUpRight size={16} className="ml-auto text-dark-400" /></Link>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-6 py-8" data-scroll-ignore aria-label="Navegación principal">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-dark-red">Explora Darkshop</p>
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between py-1.5 font-display text-2xl uppercase leading-none tracking-tight text-dark-950 transition-colors hover:translate-x-1 hover:text-dark-red focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-red motion-reduce:transform-none"
              >
                <span className="flex items-center gap-3"><span className="font-body text-[10px] font-medium tracking-[0.16em] text-dark-red">0{index + 1}</span>{link.label}</span>
                <ArrowUpRight size={18} strokeWidth={1.5} className="text-dark-400 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-dark-red group-hover:opacity-100 motion-reduce:transition-none" />
              </a>
            ))}
          </div>
        </nav>

        <div className="relative shrink-0 bg-dark-950 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 text-dark-white">
          <div className="flex flex-col gap-4">
            <SocialLinks iconSize={17} />
            <div className="flex flex-col gap-2 text-xs text-dark-300">
              <a href="mailto:darkshop@reportas.com" className="flex flex-row items-center gap-3 transition-colors hover:text-dark-white"><MailIcon size={15} /><span>darkshop@reportas.com</span></a>
              <a href="tel:6023993893" className="flex flex-row items-center gap-3 transition-colors hover:text-dark-white"><PhoneIcon size={15} /><span>(602) 399 3893</span></a>
            </div>
          </div>
        </div>
      </aside>
      <PqrComponent isOpen={isPqrOpen} onClose={closePqr} />
    </>
  )
}
