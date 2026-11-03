export default function LegalSection({ section }) {
  return (
    <section id={section.id} className="scroll-mt-6 py-8 first:pt-0" aria-labelledby={`${section.id}-title`}>
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-dark-red">Sección {section.number}</p>
      <h2 id={`${section.id}-title`} className="font-display text-2xl uppercase tracking-[-0.035em] text-dark-950 sm:text-3xl">{section.title}</h2>
      <div className="mt-4 max-w-[65ch] space-y-4 text-sm font-light leading-relaxed text-dark-600 sm:text-[15px]">
        {section.blocks.map((block, blockIndex) => {
          if (block.type === 'paragraph') return <p key={`${section.id}-${blockIndex}`}>{block.text}</p>
          if (block.type === 'subtitle') return <h3 key={`${section.id}-${blockIndex}`} className="font-medium text-dark-800">{block.text}</h3>
          if (block.type === 'steps') return <ol key={`${section.id}-${blockIndex}`} className="grid grid-cols-2 gap-px border border-dark-200 bg-dark-200 sm:grid-cols-4">{block.items.map((item, itemIndex) => <li key={item} className="bg-dark-white px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wide text-dark-700"><span className="mr-1 text-dark-red">0{itemIndex + 1}</span>{item}</li>)}</ol>
          return <ul key={`${section.id}-${blockIndex}`} className="space-y-2.5">{block.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-[0.72em] h-px w-4 shrink-0 bg-dark-400" /><span>{item}</span></li>)}</ul>
        })}
      </div>
      {section.finalNote && <p className="mt-5 max-w-[65ch] border-l-2 border-dark-red pl-4 text-xs font-medium leading-relaxed text-dark-700">{section.finalNote}</p>}
    </section>
  )
}
