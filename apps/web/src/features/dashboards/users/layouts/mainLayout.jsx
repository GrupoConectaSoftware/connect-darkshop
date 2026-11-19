import { useState } from "react";
import SidebarLayout from "./sidebarLayout";
import NavLayout from "./navLayout";
import { Menu } from "lucide-react";

export default function MainLayout({ children, activeSection, onNavigateSection }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen h-full bg-[#f4f5f7] text-neutral-950 lg:flex dark:bg-[#0f0f11] dark:text-white">
      <SidebarLayout activeSection={activeSection} onNavigateSection={onNavigateSection} />
      <NavLayout
        open={open}
        onClose={() => setOpen(false)}
        activeSection={activeSection}
        onNavigateSection={onNavigateSection}
      />
      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center bg-white px-5 lg:hidden dark:bg-[#1a1a1d]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="rounded p-2"
          >
            <Menu size={22} />
          </button>
        </header>
        <main className="dashboard-content min-h-screen bg-[#f4f5f7] dark:bg-[#0f0f11]">{children}</main>
      </div>
    </div>
  );
}
