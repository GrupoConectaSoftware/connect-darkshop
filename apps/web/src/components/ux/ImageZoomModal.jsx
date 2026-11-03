import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function ImageZoomModal({ isOpen, onClose, src, alt }) {
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [isZoomed, setIsZoomed] = useState(false)

  useEffect(() => {
    if (isOpen) return
    setIsZoomed(false)
    setOrigin({ x: 50, y: 50 })
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    setOrigin({ x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) })
    setIsZoomed(true)
  }

  const resetZoom = () => {
    setIsZoomed(false)
    setOrigin({ x: 50, y: 50 })
  }

  return (
    <div role="dialog" aria-modal="true" aria-label="Vista ampliada del producto" onClick={onClose} className="fixed inset-0 z-[100] grid place-items-center bg-black/85 p-5 backdrop-blur-md">
      <button type="button" onClick={onClose} aria-label="Cerrar imagen ampliada" className="absolute right-5 top-5 grid size-10 cursor-pointer place-items-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"><X size={20} /></button>
      <div onClick={(event) => event.stopPropagation()} onMouseMove={handleMouseMove} onMouseLeave={resetZoom} className={`max-h-[90vh] max-w-[90vw] overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
        <img src={src} alt={alt} style={{ transform: isZoomed ? 'scale(2)' : 'scale(1)', transformOrigin: `${origin.x}% ${origin.y}%` }} className="block max-h-[90vh] max-w-[90vw] object-contain transition-transform duration-200 ease-out" />
      </div>
    </div>
  )
}
