export default function TypingIndicator() {
  return <div role="status" aria-label="DarkMood está pensando" className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-none bg-gray-100 px-4 py-4">{[0, 150, 300].map(delay => <span key={delay} style={{ animationDelay: `${delay}ms` }} className="size-2 animate-bounce rounded-full bg-neutral-800 motion-reduce:animate-none" />)}<span className="sr-only">DarkMood está pensando</span></div>
}
