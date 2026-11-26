export default function ChatBubble({ text, sender }) {
  const user = sender === 'user'
  return <div className={`flex ${user ? 'justify-end' : 'justify-start'}`}><p className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${user ? 'rounded-tr-none bg-black text-white' : 'rounded-tl-none bg-gray-100 text-black'}`}>{text}</p></div>
}
