import { Activity } from "lucide-react";

export default function RecentActivityTimeline({ data }) {
  const markerTones = ["bg-neutral-950", "bg-neutral-700", "bg-neutral-500", "bg-neutral-300", "bg-neutral-200"];

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-neutral-200 bg-white p-5">
      <div className="flex shrink-0 gap-3">
        <Activity size={21} />
        <div>
          <h2 className="font-bold">Actividad reciente</h2>
          <p className="text-xs text-neutral-500">Últimas acciones en tu cuenta.</p>
        </div>
      </div>
      {data.length ? (
        <div className="mt-5 max-h-64 min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ol className="ml-2 space-y-5 border-l border-neutral-200 pl-5">
            {data.map((item, index) => (
              <li key={item.detail} className="relative">
                <span className={`absolute -left-[1.6rem] top-1 size-2.5 rounded-full ${markerTones[Math.min(index, markerTones.length - 1)]} ${index === 0 ? "animate-pulse ring-4 ring-neutral-950/10" : ""}`} />
                <p className="text-xs font-semibold">{item.title}</p>
                <p className="mt-1 text-xs text-neutral-500">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      ) : <p className="py-10 text-center text-sm text-neutral-500">No hay actividad reciente</p>}
    </section>
  );
}
