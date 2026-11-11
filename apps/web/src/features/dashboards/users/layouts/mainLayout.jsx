import { useState } from "react";
import SidebarLayout from "./sidebarLayout";
import NavLayout from "./navLayout";
import { Menu } from "lucide-react";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f4f5f7] text-neutral-950 lg:flex">
      <SidebarLayout />
      <NavLayout open={open} onClose={() => setOpen(false)} />
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center bg-white px-5 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="rounded p-2"
          >
            <Menu size={22} />
          </button>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
