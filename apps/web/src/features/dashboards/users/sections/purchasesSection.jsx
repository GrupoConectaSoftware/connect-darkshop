import hero from "../../../../assets/Brand/category/categoryUno.webp";
import setOne from "../../../../assets/Brand/sets/setDos.webp";
import setTwo from "../../../../assets/Brand/sets/setCuatro.webp";
import setThree from "../../../../assets/Brand/sets/setCinco.webp";
import { products } from "../../../../data/dashboardData.js";
import PurchasesListComponent from "../components/purchases/PurchasesListComponent";
import PurchasesSidebarComponent from "../components/purchases/PurchasesSidebarComponent";

const sampleProducts = products.slice(0, 4);
const images = sampleProducts.map((product) => product.image);
const orders = [
  { id: "#DS-00241", date: "12 oct. 2026", status: "En camino", delivery: "16 oct. 2026", total: 189900, images },
  { id: "#DS-00217", date: "28 sep. 2026", status: "Entregada", delivery: "02 oct. 2026", total: 329800, images: images.slice(1, 2) },
  { id: "#DS-00193", date: "15 sep. 2026", status: "Procesando", delivery: "16 sep. 2026", total: 179950, images: images.slice(0, 2) },
  { id: "#DS-00176", date: "03 sep. 2026", status: "Cancelada", delivery: "05 sep. 2026", total: 245600, images: images.slice(1) },
  { id: "#DS-00158", date: "22 ago. 2026", status: "Entregada", delivery: "27 ago. 2026", total: 167300, images: images.slice(0, 1) },
  { id: "#DS-00142", date: "08 ago. 2026", status: "Entregada", delivery: "12 ago. 2026", total: 218500, images: images.slice(0, 2) },
  { id: "#DS-00129", date: "24 jul. 2026", status: "Entregada", delivery: "29 jul. 2026", total: 99900, images: images.slice(2, 3) },
  { id: "#DS-00108", date: "11 jul. 2026", status: "Cancelada", delivery: "14 jul. 2026", total: 152000, images: images.slice(0, 4) },
  { id: "#DS-00094", date: "26 jun. 2026", status: "Entregada", delivery: "30 jun. 2026", total: 145000, images: images.slice(1, 2) },
  { id: "#DS-00081", date: "09 jun. 2026", status: "Entregada", delivery: "13 jun. 2026", total: 264900, images: images.slice(0, 3) },
  { id: "#DS-00067", date: "22 may. 2026", status: "Entregada", delivery: "27 may. 2026", total: 129900, images: images.slice(3, 4) },
  { id: "#DS-00052", date: "03 may. 2026", status: "Entregada", delivery: "08 may. 2026", total: 199800, images: images.slice(0, 2) },
];
const sets = [{ name: "Set Urban Black", description: "Camiseta · Pantalón · Gorra", price: 99900, image: setOne, date: "2026-10-12" }, { name: "Conjunto nocturno", description: "Camiseta · Pantalón", price: 145000, image: setTwo, date: "2026-09-28" }, { name: "Conjunto Medusa", description: "Camiseta · Pantalón", price: 152000, image: setThree, date: "2026-08-22" }];

export default function PurchasesSection() {
  return <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col overflow-hidden bg-[#f6f7f8] dark:bg-[#0f0f11]"><header className="relative isolate flex min-h-48 shrink-0 items-center overflow-hidden bg-neutral-200"><img src={hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80"/><div className="absolute inset-0 -z-10 bg-linear-to-r from-white dark:from-[#0f0f11] via-white/85 dark:via-[#0f0f11]/90 to-transparent"/><div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10"><p className="text-[10px] font-bold tracking-[.16em] text-neutral-600 dark:text-neutral-300">MI CUENTA <span className="mx-2 text-red-700">/</span> MIS COMPRAS</p><h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">Mis compras</h1><p className="mt-2 max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">Aquí puedes ver el historial de tus compras, consultar el estado de tus pedidos y acceder a sus detalles.</p></div></header><div className="relative z-10 mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 gap-5 overflow-hidden px-4 pb-1 pt-4 sm:px-6 lg:-mt-12 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:px-10 lg:pt-0"><div className="min-h-0 lg:pt-12"><PurchasesListComponent orders={orders}/></div><div className="min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><PurchasesSidebarComponent sets={sets} products={sampleProducts}/></div></div></div>;
}
