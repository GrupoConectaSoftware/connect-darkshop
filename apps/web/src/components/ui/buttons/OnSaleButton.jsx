import { useState } from 'react'
import { TicketPercent } from 'lucide-react'
import promotionsIcon from '../../../assets/Promotions/imagesPromotions.webp'
import PromotionsModal from '../promotions/PromotionsModal'

export default function OnSaleButton({ autoOpen = false, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(autoOpen)
  const changeOpen = (open) => {
    setIsOpen(open)
    onOpenChange?.(open)
  }

  return (
    <>
      <button type="button" onClick={() => changeOpen(true)} aria-label="Abrir promociones" className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#111] text-white shadow-lg transition-all hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
        <img src={promotionsIcon} alt="" className="h-full w-full rounded-full object-cover" />
        <span className="sr-only"><TicketPercent aria-hidden="true" /></span>
      </button>
      <PromotionsModal isOpen={isOpen} onClose={() => changeOpen(false)} />
    </>
  )
}
