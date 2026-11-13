import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Shield,
  ShoppingBag,
  Truck,
  Heart,
  SlidersHorizontal,
  FileText,
  ShoppingCart,
  X,
} from "lucide-react";
import avatar from "../../../../assets/Profile/imagesProfile.webp";

const links = [
  [Home, "Bienvenida", "/dashboard"],
  [User, "Perfil", "/config"],
  [Shield, "Seguridad", "/config"],
  [ShoppingBag, "Mis compras", "/dashboard"],
  [Truck, "Pedidos", "/dashboard"],
  [Heart, "Mis favoritos", "/favorites"],
  [SlidersHorizontal, "Preferencias", "/config"],
  [FileText, "Reportes", "/dashboard"],
  [ShoppingCart, "Carro de compras", "/cart"],
];
export default function NavLayout({ open, onClose, activeSection, onNavigateSection }) {
  const { pathname } = useLocation();
  const activeIndex = links.findIndex(([, , to]) => to === pathname);
  return (
    <>
      <div
        onClick={onClose}
        className={`${open ? "fixed" : "hidden"} inset-0 z-40 bg-black/60 lg:hidden`}
        aria-hidden="true"
      />
      <aside
        className={`${open ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col overflow-y-auto bg-[#0a0a0a] px-7 py-6 text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0`}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar menú"
          className="ml-auto lg:hidden"
        >
          <X />
        </button>
        <div className="border-b border-white/20 pb-7 text-center">
          <div className="mx-auto block w-fit rounded-full p-1 ring-1 ring-white/25">
            <img
              src={avatar}
              alt="Foto de perfil"
              className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
            />
          </div>
          <p className="mt-4 text-sm font-bold">Alejandro Aguilón Buitrago</p>
          <p className="mt-1 text-[10px] uppercase tracking-[.18em] text-neutral-500">
            Mi cuenta
          </p>
        </div>
        <nav className="mt-5 flex flex-col gap-1">
          {links.map(([Icon, label, to], index) => {
            const dashboardSection = ["Bienvenida", "Perfil", "Seguridad"].includes(label);
            const active = label === "Perfil"
              ? activeSection === "profile"
              : label === "Seguridad"
                ? activeSection === "security"
              : label === "Bienvenida"
                ? activeSection === "welcome"
                : index === activeIndex;
            const className = `flex items-center gap-3 rounded-lg px-2 py-3 text-sm transition-colors hover:bg-white/10 ${active ? "bg-red-950/20 text-red-600" : "text-neutral-100"}`;

            if (dashboardSection) {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onNavigateSection?.(label === "Perfil" ? "profile" : label === "Seguridad" ? "security" : "welcome");
                    onClose();
                  }}
                  aria-current={active ? "page" : undefined}
                  className={`${className} w-full text-left`}
                >
                  <Icon size={20} strokeWidth={1.5} />
                  {label}
                </button>
              );
            }

            return (
              <Link key={label} to={to} onClick={onClose} aria-current={active ? "page" : undefined} className={className}>
                <Icon size={20} strokeWidth={1.5} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
