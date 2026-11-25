import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Moon, Shirt, Sparkles, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../assets/Logotype/imagesLogotype.webp'
import advertising from '../../../movies/homespages/presentation/videoAdvertising.mp4'
import recommendedVideo from '../../../movies/brand/recomendaded/videoDos.mp4'
import { catalogProducts } from '../../../features/users/consumer/clothes/clothes'
import { collectionsData } from '../../../data/collections'
import { useTheme } from '../../../context/ThemeContext'
import OnSaleButton from '../buttons/OnSaleButton'

function HangerIcon({ size = 20 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 6.5a2.5 2.5 0 1 1 4.3 1.8c-.6.6-1.8 1.1-1.8 2.2v.5" />
      <path d="m3 15 9-5 9 5" />
      <path d="M3 15v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    </svg>
  )
}

export default function FloatingWidgets({ autoOpenAd = false } = {}) {
  const navigate = useNavigate()
  const touchStart = useRef(null)
  const lastSwipe = useRef(0)
  const [videoIndex, setVideoIndex] = useState(0)
  const changeVideo = () => {
    if (Date.now() - lastSwipe.current < 600) return
    lastSwipe.current = Date.now()
    setVideoIndex((index) => (index + 1) % 2)
  }
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const [isAdOpen, setIsAdOpen] = useState(autoOpenAd)
  const [isBouncing, setIsBouncing] = useState(false)
  const isBrandPage = pathname === '/brand'
  const isLoggedPage = pathname === '/logged' || pathname.startsWith('/logged/')
  const isAdButtonVisible = !isBrandPage && !isLoggedPage
  const isPublicHomepage = pathname === '/' || pathname === '/homepages' || /^\/(hombre|mujer|unisex|ninos|todo)$/.test(pathname)

  useEffect(() => {
    setIsAdOpen(isAdButtonVisible && isPublicHomepage && autoOpenAd)
  }, [autoOpenAd, isAdButtonVisible, isPublicHomepage])

  useEffect(() => {
    if (!isBouncing) return undefined
    const timer = window.setTimeout(() => setIsBouncing(false), 3000)
    return () => window.clearTimeout(timer)
  }, [isBouncing])

  const closeAd = () => {
    setIsAdOpen(false)
    setIsBouncing(true)
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100] flex flex-col items-center gap-4">
        <button type="button" onClick={toggleTheme} aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'} aria-pressed={isDark} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] text-red-500 shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"><Moon size={20} /></button>
        <OnSaleButton autoOpen={autoOpenAd && isPublicHomepage} />
        <button type="button" onClick={() => navigate('/catalog')} aria-label="Ver catálogo" className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"><HangerIcon /><span className="absolute -right-1 -top-1 rounded-full border border-[#111] bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white">{catalogProducts.length}</span></button>
        {!isBrandPage && <button type="button" onClick={() => navigate('/poster')} aria-label="Ver colecciones" className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"><Shirt size={20} /><span className="absolute -right-1 -top-1 rounded-full border border-[#111] bg-red-600 px-1.5 py-0.5 text-[0.6rem] font-bold text-white">{collectionsData.length}</span></button>}
      </div>

      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
        {isAdButtonVisible && <>
          <div className={`absolute bottom-32 right-0 aspect-[9/16] w-[min(320px,calc(100vw-3rem),calc((100dvh-11rem)*9/16))] origin-bottom-right overflow-hidden rounded-3xl border-2 border-white/80 bg-[#0a0a0a] shadow-[0_0_24px_rgba(255,255,255,0.35),0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-500 ${isAdOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-95 opacity-0'}`} aria-hidden={!isAdOpen}>
            {isAdOpen && <div className="relative h-full w-full overflow-hidden overscroll-contain" onWheel={(event) => { event.stopPropagation(); if (Math.abs(event.deltaY) > 10) changeVideo() }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientY }} onTouchEnd={(event) => { if (touchStart.current !== null && Math.abs(event.changedTouches[0].clientY - touchStart.current) > 40) changeVideo(); touchStart.current = null }}>
              <div className={`h-full w-full transition-transform duration-500 ease-out ${videoIndex === 1 ? '-translate-y-full' : 'translate-y-0'}`}>
                {[advertising, recommendedVideo].map((src) => <div key={src} className="relative h-full w-full overflow-hidden"><video src={src} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" /></div>)}
              </div>
              <button type="button" onClick={changeVideo} aria-label="Ver siguiente video" className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 whitespace-nowrap text-white drop-shadow-lg"><span className="text-[0.55rem] font-bold tracking-widest">DESLIZA PARA VER MÁS</span><ChevronDown size={20} className="animate-bounce motion-reduce:animate-none" /></button>
            </div>}
            {isAdOpen && <button type="button" onClick={closeAd} aria-label="Cerrar publicidad" className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white backdrop-blur-md transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><X size={20} /></button>}
          </div>
          <button type="button" aria-label={isAdOpen ? 'Cerrar publicidad' : 'Ver publicidad'} aria-expanded={isAdOpen} onClick={() => { setIsAdOpen(!isAdOpen); setIsBouncing(false) }} className={`relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 ${isBouncing ? 'animate-ad-bounce motion-reduce:animate-none' : ''}`}>
            <img src={logo} alt="" className="h-6 w-6 object-contain" />
          </button>
        </>}
        <button type="button" disabled aria-label="Asistente de IA próximamente" title="Asistente de IA próximamente" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#111] text-white shadow-lg transition-all disabled:cursor-not-allowed"><Sparkles size={20} /></button>
      </div>
    </>
  )
}
