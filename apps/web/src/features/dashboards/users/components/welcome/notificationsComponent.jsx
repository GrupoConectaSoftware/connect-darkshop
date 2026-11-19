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
      className="h-full rounded-2xl border border-gray-200 dark:border-neutral-700 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md dark:border-[#2a2a2d] dark:bg-[#1a1a1d]"
    >
      <div className="flex gap-3">
        <Bell size={25} />
        <div>
          <h2 className="font-bold">Notificaciones</h2>
          <p className="text-sm text-neutral-500 dark:text-gray-400">
            Tienes {notifications.length} notificaciones en total
          </p>
        </div>
      </div>
      {notifications.length ? (
        <ul
          tabIndex={0}
          aria-label="Lista de notificaciones"
          className="mt-5 max-h-28 space-y-3 overflow-y-auto pr-2 text-xs text-neutral-600 dark:text-neutral-300 scrollbar-none focus-visible:outline focus-visible:outline-red-700 [&::-webkit-scrollbar]:hidden"
        >
          {notifications.map((item, index) => (
            <li key={item.id} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className={`mt-1 size-1.5 shrink-0 rounded-full ${dotColors[Math.min(index, dotColors.length - 1)]}`}
              />
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-neutral-500 dark:text-gray-400">
          No tienes notificaciones nuevas.
        </p>
      )}
    </section>
  );
}
