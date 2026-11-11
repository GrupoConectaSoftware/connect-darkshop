import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import imageOne from '../../../../../assets/Brand/category/categoryUno.webp'
import imageTwo from '../../../../../assets/Brand/category/categoryDos.webp'
import imageThree from '../../../../../assets/Brand/category/categoryTres.webp'
import imageFour from '../../../../../assets/Brand/category/categoryCuatro.webp'
import imageFive from '../../../../../assets/Brand/category/categoryCinco.webp'

const positions = {
  '-4': 'z-10 pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-40 [transform:translate(-50%,-50%)_translateX(-350%)_rotateY(12deg)_scale(0.64)] lg:[transform:translate(-50%,-50%)_translateX(-350%)_translateZ(-230px)_rotateY(34deg)_scale(0.64)]',
  '-3': 'z-10 pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-60 [transform:translate(-50%,-50%)_translateX(-277%)_rotateY(12deg)_scale(0.7)] lg:[transform:translate(-50%,-50%)_translateX(-277%)_translateZ(-180px)_rotateY(30deg)_scale(0.7)]',
  '-2': 'z-10 pointer-events-none opacity-0 md:pointer-events-auto md:opacity-80 [transform:translate(-50%,-50%)_translateX(-196%)_rotateY(12deg)_scale(0.78)] lg:[transform:translate(-50%,-50%)_translateX(-196%)_translateZ(-120px)_rotateY(24deg)_scale(0.78)]',
  '-1': 'z-20 opacity-90 [transform:translate(-50%,-50%)_translateX(-115%)_rotateY(12deg)_scale(0.88)] lg:[transform:translate(-50%,-50%)_translateX(-104%)_translateZ(-60px)_rotateY(16deg)_scale(0.88)]',
  '0': 'z-30 opacity-100 [transform:translate(-50%,-50%)]',
  '1': 'z-20 opacity-90 [transform:translate(-50%,-50%)_translateX(115%)_rotateY(-12deg)_scale(0.88)] lg:[transform:translate(-50%,-50%)_translateX(104%)_translateZ(-60px)_rotateY(-16deg)_scale(0.88)]',
  '2': 'z-10 pointer-events-none opacity-0 md:pointer-events-auto md:opacity-80 [transform:translate(-50%,-50%)_translateX(196%)_rotateY(-12deg)_scale(0.78)] lg:[transform:translate(-50%,-50%)_translateX(196%)_translateZ(-120px)_rotateY(-24deg)_scale(0.78)]',
  '3': 'z-10 pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-60 [transform:translate(-50%,-50%)_translateX(277%)_rotateY(-12deg)_scale(0.7)] lg:[transform:translate(-50%,-50%)_translateX(277%)_translateZ(-180px)_rotateY(-30deg)_scale(0.7)]',
  '4': 'z-10 pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-40 [transform:translate(-50%,-50%)_translateX(350%)_rotateY(-12deg)_scale(0.64)] lg:[transform:translate(-50%,-50%)_translateX(350%)_translateZ(-230px)_rotateY(-34deg)_scale(0.64)]',
}

const fallbackImages = [imageOne, imageTwo, imageThree, imageFour, imageFive]
const modulo = (number, length) => ((number % length) + length) % length

function CollectionCard({ collection, offset, active, didDragRef, onMove }) {
  const navigate = useNavigate()
  const [imageIndex, setImageIndex] = useState(0)
  const [flashPhase, setFlashPhase] = useState('idle')
  const [imageVisible, setImageVisible] = useState(true)
  const hoverDelay = useRef(null)
  const interval = useRef(null)
  const shotTimers = useRef([])
  const firing = useRef(false)
  const prefersReducedMotion = useRef(false)
  const images = collection.images?.length ? collection.images : [collection.image, ...fallbackImages.filter((src) => src !== collection.image)].slice(0, 4)
  const currentImage = images[imageIndex % images.length]

  const clearShotTimers = () => {
    shotTimers.current.forEach(clearTimeout)
    shotTimers.current = []
  }

  const fireFlash = () => {
    if (firing.current || images.length < 2) return
    firing.current = true
    if (prefersReducedMotion.current) {
      setImageVisible(false)
      shotTimers.current.push(setTimeout(() => {
        setImageIndex((current) => (current + 1) % images.length)
        setImageVisible(true)
        firing.current = false
      }, 40))
      return
    }

    setFlashPhase('peak')
    shotTimers.current.push(setTimeout(() => {
      setImageIndex((current) => (current + 1) % images.length)
      setFlashPhase('fade')
    }, 70))
    shotTimers.current.push(setTimeout(() => {
      setFlashPhase('idle')
      firing.current = false
    }, 500))
  }

  const startPhotoSequence = () => {
    if (hoverDelay.current || interval.current) return
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    images.forEach((src) => {
      const preload = new Image()
      preload.src = src
    })
    hoverDelay.current = setTimeout(() => {
      hoverDelay.current = null
      fireFlash()
      interval.current = setInterval(fireFlash, 1800)
    }, 150)
  }

  const stopPhotoSequence = () => {
    clearTimeout(hoverDelay.current)
    clearInterval(interval.current)
    hoverDelay.current = null
    interval.current = null
    clearShotTimers()
    firing.current = false
    setFlashPhase('idle')
    setImageVisible(true)
  }

  useEffect(() => () => {
    clearTimeout(hoverDelay.current)
    clearInterval(interval.current)
    shotTimers.current.forEach(clearTimeout)
  }, [])

  return (
    <div className={`absolute left-1/2 top-1/2 @container transform-3d transition-all duration-700 ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none aspect-[3/4.2] max-h-[86%] w-[min(48vw,235px)] md:w-[min(19vw,200px)] lg:max-h-[90%] lg:w-[min(22vw,370px)] backface-hidden ${positions[offset]}`}>
      <button
        type="button"
        onMouseEnter={startPhotoSequence}
        onMouseLeave={stopPhotoSequence}
        onFocus={startPhotoSequence}
        onBlur={stopPhotoSequence}
        onClick={() => {
          if (didDragRef.current) { didDragRef.current = false; return }
          if (active) navigate(`/collection/${collection.slug}`)
          else onMove(offset)
        }}
        aria-label={active ? `Explorar colecciÃ³n ${collection.label}` : `Seleccionar colecciÃ³n ${collection.label}`}
        aria-pressed={active}
        tabIndex={Math.abs(offset) > 2 ? -1 : 0}
        className={`group relative block size-full cursor-pointer overflow-hidden rounded-2xl border text-left transition-[transform,filter,box-shadow,opacity,border-color] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5 hover:scale-[1.025] hover:border-red-700/70 focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-red-700 ${active ? 'border-[#c0000a] shadow-[0_0_40px_rgba(192,0,10,.35),0_30px_60px_rgba(0,0,0,.5)]' : 'border-white/55 shadow-[0_0_0_1px_rgba(255,255,255,.15),0_0_24px_rgba(255,255,255,.25),0_20px_40px_rgba(0,0,0,.3)]'}`}
      >
        <img
          src={currentImage}
          alt=""
          draggable="false"
          className={`absolute inset-0 size-full object-cover object-top transition-[filter,transform,opacity] duration-500 ease-out group-hover:scale-[1.035] ${imageVisible ? 'opacity-100' : 'opacity-0'} ${flashPhase === 'fade' ? 'brightness-[1.6] scale-[1.04]' : ''} ${active ? 'contrast-110 saturate-100 brightness-100' : 'grayscale-[.85] contrast-[1.15] brightness-[.85] group-hover:grayscale-[.45] group-hover:brightness-95'}`}
        />
        {active && <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#8a0008]/65 via-[#5c0006]/30 to-[#1a0000]/75 mix-blend-multiply" />}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,.92)_0%,rgba(0,0,0,.4)_55%,transparent_85%)]" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_50px_rgba(0,0,0,.48)]" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.22),transparent_35%)] mix-blend-screen" />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_40%,#fff_0%,rgba(255,255,255,.9)_40%,rgba(255,255,255,.6)_100%)] transition-opacity ease-out ${flashPhase === 'peak' ? 'opacity-100 duration-70' : flashPhase === 'fade' ? 'opacity-0 duration-380' : 'opacity-0 duration-0'}`}
        />
        {flashPhase !== 'idle' && <span aria-hidden="true" className={`pointer-events-none absolute right-8 top-8 z-10 size-2 rounded-full bg-white shadow-[0_0_16px_8px_rgba(255,255,255,.8)] transition-opacity duration-300 ${flashPhase === 'peak' ? 'opacity-100' : 'opacity-0'}`} />}
        <span className="absolute bottom-4.5 left-4 right-4 z-20 flex items-end gap-3 text-white sm:left-4 sm:right-4">
          <span className={`line-clamp-2 min-w-0 flex-1 max-w-[calc(100%-56px)]display:-webkit-box] [-webkit-box-orient:vertical] [owrap-anywhereyphens-auto font-bold uppercase leading-[0.95] tracking-[0.01em] [text-shadow:0_2px_12px_rgba(0,0,0,.75)] ${active ? 'text-[clamp(24px,13cqw,42px)]' : 'text-[clamp(18px,11cqw,34px)]'} font-[Oswald,sans-serif]`}>
            {collection.label}
          </span>
          <span aria-hidden="true" className={`relative z-30 grid size-9 shrink-0 place-items-center rounded-full border border-white/70 bg-white/[.14] text-white shadow-[0_4px_16px_rgba(0,0,0,.35)] backdrop-blur-md transition-colors duration-300 group-hover:border-[#c0000a] group-hover:bg-[#c0000a] group-hover:[&>svg]:translate-x-0.5 ${active ? 'size-10.5 border-white/80' : ''}`}>
            <ArrowRight className="transition-transform duration-300" size={16} strokeWidth={2} />
          </span>
        </span>
      </button>
      <img src={currentImage} alt="" aria-hidden="true" className={`pointer-events-none absolute left-0 top-[calc(100%+8px)] -z-10 h-28 w-full rounded-2xl object-cover object-top opacity-20 blur-[6px] mask-[linear-gradient(to_bottom,black_0%,transparent_78%)] transform-[scaleY(-1)] ${active ? 'saturate-75 drop-shadow-[0_18px_18px_rgba(192,0,10,.22)]' : 'grayscale-[.85]'}`} />
    </div>
  )
}

export default function CarouselSection({ collections, cursor, onMove }) {
  const startX = useRef(null)
  const didDrag = useRef(false)
  const lastWheel = useRef(0)
  const offsets = [-4, -3, -2, -1, 0, 1, 2, 3, 4]

  const onPointerDown = (event) => {
    startX.current = event.clientX
    didDrag.current = false
  }
  const onPointerUp = (event) => {
    if (startX.current === null) return
    const delta = event.clientX - startX.current
    startX.current = null
    if (Math.abs(delta) > 45) {
      didDrag.current = true
      onMove(delta < 0 ? 1 : -1)
    }
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&display=swap" rel="stylesheet" precedence="default" />
      <section id="colecciones-carrusel" aria-label="Carrusel de colecciones" tabIndex={0} onKeyDown={(event) => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault()
          onMove(event.key === 'ArrowRight' ? 1 : -1)
        }
      }} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => { startX.current = null }} onWheel={(event) => {
        if (Math.abs(event.deltaX) < 10 && Math.abs(event.deltaY) < 10) return
        if (Date.now() - lastWheel.current < 500) return
        lastWheel.current = Date.now()
        onMove((Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) > 0 ? 1 : -1)
      }} className="relative z-10 min-h-0 w-full flex-1 overflow-hidden px-3 py-6 sm:px-5 lg:px-7 perspective-[1600px] perspective-origin-[50%_45%] mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [touch-action:pan-y] focus-visible:outline focus-visible:outline-red-700">
        <div className="relative h-full w-full transform-3d">
          {collections.length > 0 && offsets.map((offset) => {
            const absoluteIndex = cursor + offset
            const collection = collections[modulo(absoluteIndex, collections.length)]
            const active = offset === 0
            return <CollectionCard key={absoluteIndex} collection={collection} offset={offset} active={active} didDragRef={didDrag} onMove={onMove} />
          })}
        </div>
      </section>
    </>
  )
}
