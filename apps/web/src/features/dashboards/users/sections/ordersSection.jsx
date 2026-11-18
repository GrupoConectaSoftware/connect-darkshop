import { useState } from "react";
import hero from "../../../../assets/Brand/category/categoryUno.webp";
import { products } from "../../../../data/dashboardData.js";
import OrdersFilters from "../components/orders/OrdersFilters";
import OrdersListComponent from "../components/orders/OrdersListComponent";
import TrackingSidebarComponent from "../components/orders/TrackingSidebarComponent";
import OrderDetailsModal from "../../../../components/ui/OrderDetailsModal";
import SupportCard from "../components/orders/SupportCard";

const images = products.slice(0, 4).map((product) => product.image);
const orders = [
  { id: "#DS-00241", date: "12 oct. 2026", delivery: "16 oct. 2026", status: "En camino", total: 189900, images, guide: "CDR-884592301", carrier: "Coordinadora", address: "Cra. 80 # 44-32, Cali, Colombia" },
  { id: "#DS-00217", date: "28 sep. 2026", delivery: "02 oct. 2026", status: "Entregados", total: 329800, images: images.slice(0, 3), guide: "CDR-884592302", carrier: "Coordinadora", address: "Cra. 80 # 44-32, Cali, Colombia" },
  { id: "#DS-00193", date: "15 sep. 2026", delivery: "18 sep. 2026", status: "En preparación", total: 179950, images: images.slice(1, 3), guide: "CDR-884592303", carrier: "Coordinadora", address: "Cra. 80 # 44-32, Cali, Colombia" },
  { id: "#DS-00176", date: "03 sep. 2026", delivery: "05 sep. 2026", status: "Cancelados", total: 245600, images: images.slice(0, 3), guide: "CDR-884592304", carrier: "Coordinadora", address: "Cra. 80 # 44-32, Cali, Colombia" },
  { id: "#DS-00158", date: "22 ago. 2026", delivery: "27 ago. 2026", status: "Entregados", total: 167300, images: images.slice(1, 4), guide: "CDR-884592305", carrier: "Coordinadora", address: "Cra. 80 # 44-32, Cali, Colombia" },
];
export default function OrdersSection() {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(orders[0]);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const visible = orders.filter((order) => (filter === "Todos" || order.status === filter) && order.id.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-[#f6f7f8] lg:h-screen"><header className="relative isolate flex min-h-44 shrink-0 items-center overflow-hidden bg-neutral-200 sm:min-h-48"><img src={hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80"/><div className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/85 to-transparent"/><div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10"><p className="text-[10px] font-bold tracking-[.16em] text-neutral-600">MI CUENTA <span className="mx-2 text-red-700">/</span> PEDIDOS</p><h1 className="mt-2 font-display text-4xl font-black text-neutral-950 sm:text-5xl">Pedidos</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">Consulta el estado de tus pedidos, realiza seguimiento y revisa todos los detalles.</p></div></header><div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-4 overflow-y-auto px-4 pb-5 pt-4 [scrollbar-width:none] sm:px-6 lg:overflow-hidden lg:px-10 [&::-webkit-scrollbar]:hidden"><div className="shrink-0"><OrdersFilters summary orders={orders} filter={filter} onFilter={setFilter}/></div><div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-12"><div className="flex min-h-[460px] min-w-0 flex-col gap-3 lg:col-span-8 lg:min-h-0"><OrdersFilters orders={orders} filter={filter} onFilter={setFilter} query={query} onQuery={setQuery}/><OrdersListComponent orders={visible} selected={selected} onSelect={setSelected} onViewDetails={setDetailsOrder}/><SupportCard/></div><div className="min-h-[570px] min-w-0 lg:col-span-4 lg:min-h-0"><TrackingSidebarComponent order={selected} orders={orders} onSelect={setSelected}/></div></div></div><OrderDetailsModal order={detailsOrder} onClose={() => setDetailsOrder(null)}/></div>;
}
