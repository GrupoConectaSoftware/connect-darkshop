import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export default function CarouselSelector({
  title,
  subtitle,
  options,
  selected,
  onToggle,
}) {
  const rail = useRef(null);
  const move = (direction) =>
    rail.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white p-5 shadow-sm dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
          {selected.length}/{options.length}
        </span>
      </div>
      <div className="relative mt-4">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={`Ver opciones anteriores de ${title}`}
          className="absolute left-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-600 dark:text-gray-300 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-red-700 dark:bg-[#1a1a1d]"
        >
          <ChevronLeft size={16} />
        </button>
        <div
          ref={rail}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-10 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {options.map((option) => {
            const active = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle(option.id)}
                className={`relative min-w-28 snap-start rounded-xl border px-4 py-3 text-xs font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-red-700 ${active ? "border-neutral-950 bg-[#111] text-white shadow-sm" : "border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#222226] text-gray-700 dark:text-gray-200 hover:border-gray-300 hover:bg-gray-100"}`}
              >
                <span>{option.label}</span>
                {active && (
                  <CheckCircle2
                    aria-hidden="true"
                    size={15}
                    className="absolute right-2 top-2 text-white"
                  />
                )}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={`Ver más opciones de ${title}`}
          className="absolute right-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-600 dark:text-gray-300 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-red-700 dark:bg-[#1a1a1d]"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
