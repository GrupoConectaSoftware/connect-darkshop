import { Send } from 'lucide-react'

export default function BarSendComponent({ value, onChange, onSend, inputRef, enabled }) {
  return <form onSubmit={onSend} className="border-t border-neutral-200 bg-white p-4"><div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 p-1 pl-4"><input ref={inputRef} disabled={!enabled} aria-label="Escribe tu mensaje" value={value} onChange={e => onChange(e.target.value)} placeholder="Escribe tu mensaje..." className="min-w-0 flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed" /><button type="submit" disabled={!enabled} aria-label="Enviar mensaje" className="grid size-10 place-items-center rounded-full bg-red-700 text-white transition-colors hover:bg-red-800 disabled:opacity-40"><Send size={18} /></button></div></form>
}
