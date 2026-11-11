import { Bell } from "lucide-react";
export default function NotificationsComponent({ notifications }) {
  const dotColors = [
    "bg-red-800",
    "bg-red-800/70",
    "bg-red-800/45",
    "bg-red-800/25",
  ];
  return (
    <section
      id="notifications"
      className="h-full rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="flex gap-3">
        <Bell size={25} />
        <div>
          <h2 className="font-bold">Notificaciones</h2>
          <p className="text-sm text-neutral-500">
            Tienes {notifications.length} notificaciones nuevas
          </p>
        </div>
      </div>
      {notifications.length ? (
        <ul
          tabIndex={0}
          aria-label="Lista de notificaciones"
          className="mt-5 max-h-28 space-y-3 overflow-y-auto pr-2 text-xs text-neutral-600 scrollbar-none focus-visible:outline focus-visible:outline-red-700 [&::-webkit-scrollbar]:hidden"
        >
          {notifications.map((item, index) => (
            <li key={item} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className={`mt-1 size-1.5 shrink-0 rounded-full ${dotColors[Math.min(index, dotColors.length - 1)]}`}
              />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-neutral-500">
          No tienes notificaciones nuevas.
        </p>
      )}
    </section>
  );
}
