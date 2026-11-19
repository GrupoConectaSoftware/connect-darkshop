import { Link } from "react-router-dom";
import { Moon, MessageSquare, BarChart3, LogOut } from "lucide-react";
import { notificationsData } from "../../../../data/notifications.js";
import { useTheme } from "../../../../context/ThemeContext";

export default function SidebarLayout({ activeSection, onNavigateSection }) {
  const { isDark, toggleTheme } = useTheme();
  const notificationCount = notificationsData.length;
  const actions = [
    [MessageSquare, "Notificaciones", "/dashboard/notifications"],
    [BarChart3, "Resumen", "/dashboard"],
  ];
  return (
    <aside
      aria-label="Accesos rápidos"
      data-dashboard-sidebar
      className="sticky top-0 hidden h-screen w-16 shrink-0 flex-col items-center border-r border-neutral-300 bg-neutral-200 py-6 dark:bg-[#0a0a0a] lg:flex"
    >
      <div className="flex flex-col gap-5">
        <button
          type="button"
          title={isDark ? "Activar modo claro" : "Activar modo oscuro"}
          aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
          aria-pressed={isDark}
          onClick={toggleTheme}
          className="grid size-10 place-items-center rounded-xl text-red-600 transition-colors hover:text-red-700 focus-visible:outline focus-visible:outline-red-700"
        >
          <Moon className="text-red-600" size={22} strokeWidth={1.7} />
        </button>
        {actions.map(([Icon, label, to]) => label === "Resumen" ? (
          <button key={label} type="button" title={label} aria-label={label} aria-pressed={activeSection === "summary"} onClick={() => onNavigateSection("summary")} className="grid size-10 place-items-center text-red-600 transition-colors hover:text-red-700 focus-visible:outline focus-visible:outline-red-700"><Icon size={22} strokeWidth={1.7} /></button>
        ) : (
          <Link
            key={label}
            to={to}
            title={label}
            aria-label={
              label === "Notificaciones"
                ? `${label}, ${notificationCount} notificaciones`
                : label
            }
            className="relative grid size-10 place-items-center rounded-xl text-neutral-900 transition-colors hover:text-red-700 focus-visible:outline focus-visible:outline-red-700 dark:text-white"
          >
            <Icon size={22} strokeWidth={1.7} />
            {label === "Notificaciones" && notificationCount > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-red-800 px-1 text-[9px] font-bold text-white dark:border-[#2a2a2d]">
                {notificationCount}
              </span>
            )}
          </Link>
        ))}
      </div>
      <Link
        to="/expired"
        title="Cerrar sesión"
        aria-label="Cerrar sesión"
        className="mt-auto grid size-10 place-items-center rounded-xl text-neutral-900 transition-colors hover:text-red-700 dark:text-white"
      >
        <LogOut size={22} />
      </Link>
    </aside>
  );
}

