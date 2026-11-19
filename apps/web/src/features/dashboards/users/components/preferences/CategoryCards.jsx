import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { categoriesData } from "../../../../../data/categories.js";

export default function CategoryCards({ options, selected, onToggle }) {
  const rail = useRef(null);
  const move = (direction) =>
    rail.current?.scrollBy({ left: direction * 260, behavior: "smooth" });
  const imageFor = (id) =>
    categoriesData.find((category) => category.id === id)?.image ??
    categoriesData[0]?.image;
  return (
    <section className="rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white p-6 shadow-sm dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white">
            Tipos de prendas
          </h2>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Selecciona las categorías que más te interesan.
          </p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {selected.length}/{options.length}
        </span>
      </div>
      <div className="relative mt-4">
        <button
          type="button"
          aria-label="Ver prendas anteriores"
          onClick={() => move(-1)}
          className="absolute left-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-700 dark:text-gray-200 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-red-700 dark:bg-[#1a1a1d] dark:text-gray-300"
        >
          <ChevronLeft size={16} />
        </button>
        <div
          ref={rail}
          className="flex gap-3 overflow-x-auto scroll-smooth px-10 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {options.map((option) => {
            const active = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => onToggle(option.id)}
                className={`relative h-44 w-32 shrink-0 overflow-hidden rounded-xl border-2 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-red-700 ${active ? "border-black ring-2 ring-black/10" : "border-transparent"}`}
              >
                <img
                  src={imageFor(option.id)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />
                {active && (
                  <CheckCircle2
                    className="absolute right-2 top-2 size-4 text-white"
                    fill="black"
                  />
                )}
                <span className="absolute inset-x-3 bottom-3 text-xs font-black uppercase tracking-wide text-white">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="Ver más prendas"
          onClick={() => move(1)}
          className="absolute right-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-700 dark:text-gray-200 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-red-700 dark:bg-[#1a1a1d] dark:text-gray-300"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
