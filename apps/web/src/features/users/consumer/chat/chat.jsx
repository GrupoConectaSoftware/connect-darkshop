import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GuideComponent from './components/guideComponent'
import ChatComponent from './components/chatComponent'
import PqrComponent from '../../../../components/ui/faq/PqrComponent'
import OfficialChannels from '../../../../components/ui/channels/OfficialChannels'

export default function Chat({ isOpen, onClose }) {
  const navigate = useNavigate()
  const panelRef = useRef(null)
  const [isPqrOpen, setIsPqrOpen] = useState(false)
  const [channelsOpen, setChannelsOpen] = useState(false)
  const [isChatting, setIsChatting] = useState(false)
  const [notice, setNotice] = useState('')
  const closeChannels = useCallback(() => setChannelsOpen(false), [])
  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    const onKey = event => { if (event.key === 'Escape' && !channelsOpen) onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', onKey); previousFocus?.focus() }
  }, [isOpen, onClose, channelsOpen])
  function select({ path, chat, faq, suggestions, advisor, channels }) {
    if (chat) { setIsChatting(true); setNotice(''); return }
    if (channels) { setChannelsOpen(true); return }
    if (advisor) { setNotice('El contacto de WhatsApp estará disponible próximamente.'); return }
    if (suggestions) { window.location.href = 'mailto:darkshop@reportas.com?subject=Sugerencia%20para%20DarkShop'; return }
    if (faq) { onClose(); setIsPqrOpen(true); return }
    onClose()
    navigate(path)
  }
  return <><div className={`fixed inset-0 z-[200] ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen} inert={!isOpen}>
    <div onClick={onClose} className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    <aside ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="DarkMood, asistente de moda" className={`absolute right-0 top-0 h-full w-full max-w-md bg-white text-neutral-950 shadow-2xl outline-none transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="relative h-full overflow-hidden [perspective:1000px]">
        <div inert={isChatting} aria-hidden={isChatting} className={`absolute inset-0 overflow-y-auto bg-white pb-6 transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] motion-reduce:transition-none ${isChatting ? '[transform:rotateY(-90deg)]' : '[transform:rotateY(0deg)]'}`}><GuideComponent onClose={onClose} onSelect={select}/>{notice && <p role="status" className="mx-6 mt-4 rounded-xl bg-neutral-100 p-3 text-sm">{notice}</p>}</div>
        <div inert={!isChatting} aria-hidden={!isChatting} className={`absolute inset-0 bg-white transition-transform duration-500 [transform-style:preserve-3d] [backface-visibility:hidden] motion-reduce:transition-none ${isChatting ? '[transform:rotateY(0deg)]' : '[transform:rotateY(90deg)]'}`}><ChatComponent active={isChatting && isOpen} onBack={() => setIsChatting(false)} onClose={onClose}/></div>
      </div>
    </aside>
  </div><PqrComponent isOpen={isPqrOpen} onClose={() => setIsPqrOpen(false)}/><OfficialChannels isOpen={channelsOpen} onClose={closeChannels}/></>
}
