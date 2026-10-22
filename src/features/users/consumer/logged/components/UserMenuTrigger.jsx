import profileImage from '../../../../../assets/Profile/imagesProfile.webp'

export default function UserMenuTrigger({ isOpen, onMouseEnter, onMouseLeave, onClick }) {
  return <button type="button" aria-label="Abrir menú de Marlon Andres Duarte" aria-haspopup="true" aria-expanded={isOpen} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClick} className="group ml-1 hidden items-center gap-3 rounded-full py-1 pl-1 pr-2 text-left transition-colors hover:bg-dark-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red lg:flex">
    <img src={profileImage} alt="" className="size-12 rounded-full object-cover" />
    <span className="min-w-0"><span className="block max-w-48 truncate text-sm font-bold text-dark-950">Marlon Andres Duarte</span><span className="mt-0.5 block text-xs text-dark-400">Despliegue su navegación</span></span>
    <span aria-hidden="true" className={`text-lg leading-none text-dark-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
  </button>
}
