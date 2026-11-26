import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, X } from 'lucide-react'
import useChatSimulation from '../../../../../hooks/useChatSimulation'
import ChatBubble from '../../../../../components/ui/chat/ChatBubble'
import TypingIndicator from '../../../../../components/ux/chat/TypingIndicator'
import BarSendComponent from '../layout/barSendComponent'
export default function ChatComponent({ onBack, onClose, active }) {
  const { messages, isTyping, sendMessage } = useChatSimulation()
  const [message, setMessage] = useState('')
  const scrollRef = useRef(null)
  useEffect(() => { if (active && scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight }, [messages, isTyping, active])
  function send(event) { event.preventDefault(); if (sendMessage(message)) setMessage('') }
  return <div className="flex h-full min-h-0 flex-col bg-white"><header className="flex items-center gap-3 border-b border-neutral-200 px-6 py-5"><button type="button" onClick={onBack} aria-label="Volver al menú" className="rounded-full p-2 hover:bg-neutral-100"><ArrowLeft size={20}/></button><div className="flex-1"><h2 className="text-xl font-black">darkmood</h2><p className="text-xs text-neutral-500">Asistente de moda IA</p></div><button type="button" onClick={onClose} aria-label="Cerrar chat" className="rounded-full p-2 hover:bg-neutral-100"><X size={22}/></button></header><div ref={scrollRef} aria-live="polite" className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6">{messages.map((item, index) => <ChatBubble key={index} {...item}/>)}{isTyping && <TypingIndicator/>}</div><BarSendComponent value={message} onChange={setMessage} onSend={send} enabled={!isTyping}/></div>
}

