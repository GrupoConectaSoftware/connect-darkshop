import { useState } from "react";
import { showToast } from "../../../../utils/toast";
import hero from "../../../../assets/Brand/category/categoryUno.webp";
import PreferencesForm from "../components/preferences/PreferencesForm";
import PreferencesSidebar from "../components/preferences/PreferencesSidebar";

export default function PreferencesSection() {
  const [notifications, setNotifications] = useState([true, true, true]);
  const [sets, setSets] = useState({
    styles: ["urban", "sport", "oversize"],
    garments: ["camisetas", "sudaderas", "chaquetas"],
    colors: ["black", "gray", "wine"],
    brands: ["dark", "adidas"],
  });
  const [sizes, setSizes] = useState({
    camisetas: "L",
    sudaderas: "L",
    chaquetas: "L",
  });
  const onColorChange = (id) =>
    setSets((current) => ({
      ...current,
      colors: current.colors.includes(id)
        ? current.colors.filter((color) => color !== id)
        : [...current.colors, id],
    }));
  const save = () => {
    localStorage.setItem(
      "darkshop:dashboard-preferences",
      JSON.stringify({ sets, sizes, notifications }),
    );
    showToast("success", "Tus preferencias se guardaron correctamente.");
  };
  return (
    <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col overflow-hidden bg-[#f6f7f8] [html.dark_&]:bg-[#121212] [html.dark_&_.text-gray-950]:text-white [html.dark_&_.text-gray-700]:text-gray-300 [html.dark_&_.bg-gray-100]:bg-neutral-800 [html.dark_&_.text-gray-800]:text-gray-200 lg:h-screen dark:bg-[#0f0f11]">
      <header className="relative isolate flex min-h-44 shrink-0 items-center overflow-hidden">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-white dark:from-[#0f0f11] via-white/90 dark:via-[#0f0f11]/90 to-transparent [html.dark_&]:from-[#121212] [html.dark_&]:via-[#121212]/90" />
        <div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
          <p className="text-xs font-bold tracking-[.16em] text-gray-600 dark:text-gray-300">
            MI CUENTA <span className="mx-2 text-red-700">/</span> PREFERENCIAS
          </p>
          <h1 className="mt-2 font-display text-4xl font-black text-gray-950 sm:text-5xl dark:text-white">
            Preferencias
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            Cuéntanos qué te gusta. Personaliza tu experiencia para ver primero
            los productos que van contigo.
          </p>
        </div>
      </header>
      <div className="mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 gap-6 overflow-y-auto px-4 py-5 [scrollbar-width:none] sm:px-6 lg:grid-cols-12 lg:overflow-hidden lg:px-10 [&::-webkit-scrollbar]:hidden">
        <div className="min-h-0 overflow-y-auto pr-1 [scrollbar-width:none] lg:col-span-8 lg:[&::-webkit-scrollbar]:hidden">
          <PreferencesForm
            sets={sets}
            onChange={setSets}
            sizes={sizes}
            onSizeChange={setSizes}
            onColorChange={onColorChange}
          />
        </div>
        <div className="min-h-0 overflow-y-auto pr-1 [scrollbar-width:none] lg:col-span-4 lg:[&::-webkit-scrollbar]:hidden">
          <PreferencesSidebar
            notifications={notifications}
            setNotifications={setNotifications}
            onSave={save}
          />
        </div>
      </div>
    </div>
  );
}
