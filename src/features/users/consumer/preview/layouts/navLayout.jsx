import { Link } from 'react-router-dom'
import { User } from 'lucide-react'
import { useEffect, useState } from 'react'
import logoDarkShop from '../../../../../assets/Logometria/LogoOficial.webp'
import HeartIcon from '../../../../../commons/ui/icons/commerce/HeartIcon'
import ShoppingBagIcon from '../../../../../commons/ui/icons/commerce/ShoppingBagIcon'
import UserButton from '../../../../../components/ui/buttons/UserButton'
import SearchBar from '../../../../../components/ui/inputs/SearchBar'
import useHideOnScroll from '../../../../../hooks/useHideOnScroll'
import TextPromotionComponent from '../../homepages/components/TextPromotionComponent'
import { FAVORITES_UPDATED_EVENT, getFavorites } from '../../../../../commons/storage/favoritesStorage'

const DESKTOP_CONTAINER = 'mx-auto w-full max-w-[1600px] px-8'

function Counter({ children, mobile = false }) {
  const size = mobile ? 'size-3 text-[7px]' : 'size-4 text-[8px]'

  return (
    <span className={`absolute right-0 top-0 grid ${size} place-items-center rounded-full bg-dark-red font-bold leading-none text-dark-white`}>
      {children}
    </span>
  )
}

function CommerceActions({ mobile = false, favoriteCount }) {
  const buttonSize = mobile ? 'size-9' : 'size-10'
  const iconSize = mobile ? 19 : 17

  return (
    <div className="flex shrink-0 items-center gap-1">
      <Link to="/favorites" aria-label="Favoritos" className={`relative grid ${buttonSize} cursor-pointer place-items-center text-dark-700 transition-colors hover:text-dark-red`}>
        <HeartIcon size={iconSize} />
        {favoriteCount > 0 && <Counter mobile={mobile}>{favoriteCount}</Counter>}
      </Link>
      <button type="button" aria-label="Carrito" className={`relative grid ${buttonSize} cursor-pointer place-items-center text-dark-700 transition-colors hover:text-dark-red`}>
        <ShoppingBagIcon size={iconSize} />
        <Counter mobile={mobile}>1</Counter>
      </button>
    </div>
  )
}

export default function NavLayout() {
  const isHidden = useHideOnScroll(0.2)
  const [favoriteCount, setFavoriteCount] = useState(() => getFavorites().length)

  useEffect(() => {
    const syncFavoriteCount = () => setFavoriteCount(getFavorites().length)

    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavoriteCount)
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavoriteCount)
  }, [])

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-dark-200 bg-dark-white text-dark-950 transition-transform duration-300 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="bg-dark-950 px-4 text-dark-white sm:px-6 lg:px-8">
        <div className={`${DESKTOP_CONTAINER} flex h-8 items-center justify-center px-0 text-[10px] font-medium sm:text-[11px]`}>
          <TextPromotionComponent className="w-full overflow-hidden text-center" />
        </div>
      </div>

      <div className="hidden bg-dark-white lg:block">
        <div className={`${DESKTOP_CONTAINER} flex h-24 items-center gap-6`}>
          <div className="flex shrink-0 items-center">
            <Link to="/" className="shrink-0" aria-label="Volver al inicio de Darkshop">
              <img src={logoDarkShop} alt="Darkshop" className="h-8 w-auto object-contain" />
            </Link>
            <div className="ml-4 hidden flex-col border-l border-dark-200 pl-4 text-[8px] uppercase leading-relaxed tracking-widest text-dark-500 2xl:flex">
              <span>Moda</span><span>Cultura</span><span>Comunidad</span>
            </div>
          </div>

          <SearchBar className="mx-auto w-full max-w-[26rem] xl:max-w-[30rem]" placeholder="Busca estilos, promociones o marcas de ropa" inputClassName="h-10 text-[14px]" />

          <div className="flex shrink-0 items-center gap-3">
            <CommerceActions favoriteCount={favoriteCount} />
            <UserButton />
          </div>
        </div>
      </div>

      <div className="bg-dark-white lg:hidden">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4">
          <Link to="/" aria-label="Volver al inicio de Darkshop">
            <img src={logoDarkShop} alt="Darkshop" className="h-7 w-auto object-contain sm:h-8" />
          </Link>
          <div className="flex items-center gap-1">
            <CommerceActions mobile favoriteCount={favoriteCount} />
            <Link to="/login" aria-label="Iniciar sesión" className="grid size-9 cursor-pointer place-items-center rounded-full bg-dark-950 text-dark-white transition-colors hover:bg-dark-red">
              <User size={17} />
            </Link>
          </div>
        </div>
        <div className="border-t border-dark-100 px-4 pb-3 pt-2">
          <SearchBar className="w-full" placeholder="Busca estilos, promociones o marcas" inputClassName="h-10 text-sm" />
        </div>
      </div>
    </header>
  )
}
