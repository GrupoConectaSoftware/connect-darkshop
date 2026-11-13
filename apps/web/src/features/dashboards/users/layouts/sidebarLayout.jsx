import { Link } from "react-router-dom";
import { Moon, MessageSquare, BarChart3, LogOut } from "lucide-react";
import { notifications } from "../../../../components/ui/mockData";

export default function SidebarLayout({ activeSection, onNavigateSection }) {
  const actions = [
    [MessageSquare, "Notificaciones", "/dashboard#notifications"],
    [BarChart3, "Resumen", "/dashboard"],
  ];
  return (
    <aside
      aria-label="Accesos rápidos"
      className="sticky top-0 hidden h-screen w-16 shrink-0 flex-col items-center border-r border-neutral-300 bg-neutral-200 py-6 lg:flex"
    >
      <div className="flex flex-col gap-5">
        <span
          title="Modo oscuro"
          aria-label="Modo oscuro"
          className="grid size-10 place-items-center text-neutral-900"
        >
          <Moon size={22} strokeWidth={1.7} />
        </span>
        {actions.map(([Icon, label, to]) => label === "Resumen" ? (
          <button key={label} type="button" title={label} aria-label={label} aria-pressed={activeSection === "summary"} onClick={() => onNavigateSection("summary")} className={`grid size-10 place-items-center transition-colors hover:text-red-700 focus-visible:outline focus-visible:outline-red-700 ${activeSection === "summary" ? "text-red-700" : "text-neutral-900"}`}><Icon size={22} strokeWidth={1.7} /></button>
        ) : (
          <Link
            key={label}
            to={to}
            title={label}
            aria-label={
              label === "Notificaciones"
                ? `${label}, ${notifications.length} nuevas`
                : label
            }
            className="relative grid size-10 place-items-center rounded-xl text-neutral-900 transition-colors hover:text-red-700 focus-visible:outline focus-visible:outline-red-700"
          >
            <Icon size={22} strokeWidth={1.7} />
            {label === "Notificaciones" && notifications.length > 0 && (
              <span className="absolute -right-1 -top-1 grid min-h-4 min-w-4 place-items-center rounded-full border border-neutral-200 bg-red-800 px-1 text-[9px] font-bold text-white">
                {notifications.length}
              </span>
            )}
          </Link>
        ))}
      </div>
      <Link
        to="/expired"
        title="Cerrar sesión"
        aria-label="Cerrar sesión"
        className="mt-auto grid size-10 place-items-center rounded-xl text-neutral-900 transition-colors hover:text-red-700"
      >
        <LogOut size={22} />
      </Link>
    </aside>
  );
}

