import { CheckCircle2, ChevronLeft, ChevronRight, Ruler } from "lucide-react";
import { useMemo, useRef } from "react";
import { preferenceSizeGroups } from "../../../../../data/users.js";

export default function SizeCarousel({ selectedCategories, value, onChange }) {
  const rail = useRef(null);
  const groups = useMemo(
    () =>
      preferenceSizeGroups.filter((group) =>
        selectedCategories.includes(group.id),
      ),
    [selectedCategories],
  );
  const select = (group, size) => onChange({ ...value, [group]: size });
  const scroll = (direction) =>
    rail.current?.scrollBy({ left: direction * 225, behavior: "smooth" });
  if (!groups.length) return null;
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#222226] p-5 shadow-sm dark:border-[#2a2a2d] dark:bg-[#0f0f11]">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-full bg-gray-100 text-gray-900 dark:bg-[#27272a] dark:text-white">
          <Ruler size={18} />
        </span>
        <div>
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Tallas habituales</h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Desliza para elegir tu talla en cada categoría seleccionada.
          </p>
        </div>
      </div>
      <div className="relative mt-4 flex items-center">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Ver tallas anteriores"
          className="absolute left-0 z-10 grid size-8 place-items-center rounded-full bg-white text-gray-600 dark:text-gray-300 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-red-700 dark:bg-[#1a1a1d]"
        >
          <ChevronLeft size={16} />
        </button>
        <div
          ref={rail}
          className="flex w-full gap-4 overflow-x-auto scroll-smooth px-9 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {groups.map((group) => (
            <article
              key={group.id}
              className="min-w-[200px] rounded-xl border border-gray-200 dark:border-neutral-700 bg-white p-4 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]"
            >
              <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {group.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {group.options.map((size) => {
                  const active = value[group.id] === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      aria-pressed={active}
                      onClick={() => select(group.id, size)}
                      className={`rounded-md px-2.5 py-1.5 text-xs font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-red-700 ${active ? "bg-[#111] text-white" : "bg-gray-100 dark:bg-[#27272a] text-gray-700 dark:text-gray-200 hover:bg-gray-200"}`}
                    >
                      {size}
                      {active && (
                        <CheckCircle2 size={12} className="ml-1 inline-block" />
                      )}
                    </button>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Ver más tallas"
          className="absolute right-0 z-10 grid size-8 place-items-center rounded-full bg-white text-gray-600 dark:text-gray-300 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-red-700 dark:bg-[#1a1a1d]"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
