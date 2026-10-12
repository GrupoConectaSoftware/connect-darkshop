import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NavLayout from '../homepages/layouts/navLayout'
import { FAVORITES_UPDATED_EVENT, getFavorites } from '../../../../commons/storage/favoritesStorage'
import ProductsComponents from './components/productsComponents'
import EmptyComponents from './components/emptyComponents'

export default function Favorite() {
  const [favorites, setFavorites] = useState(() => getFavorites())

  useEffect(() => {
    const syncFavorites = () => setFavorites(getFavorites())

    window.addEventListener(FAVORITES_UPDATED_EVENT, syncFavorites)
    return () => window.removeEventListener(FAVORITES_UPDATED_EVENT, syncFavorites)
  }, [])

  return (
    <div className="min-h-screen bg-dark-white text-dark-950">
      <NavLayout />
      <main className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <nav aria-label="Miga de pan" className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wide text-dark-500">
          <Link to="/" className="transition-colors hover:text-dark-red">Inicio</Link><span>/</span><span className="text-dark-950">Favoritos</span>
        </nav>

        <div className="mt-5 flex flex-col gap-3 border-b border-dark-200 pb-8 sm:mt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-red">Selección personal</p>
            <h1 className="mt-2 font-display text-[clamp(2.35rem,6vw,4.7rem)] uppercase leading-[0.86] tracking-[-0.06em]">Tus favoritos</h1>
          </div>
          <p className="text-sm text-dark-500 sm:text-right">{favorites.length === 1 ? '1 prenda guardada' : `${favorites.length} prendas guardadas`}</p>
        </div>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-dark-600 sm:text-lg">Aquí podrás visualizar las prendas que seleccionaste durante esta sesión.</p>

        <div className="mt-10 sm:mt-12">
          {favorites.length > 0 ? <ProductsComponents products={favorites} /> : <EmptyComponents />}
        </div>
      </main>
    </div>
  )
}
