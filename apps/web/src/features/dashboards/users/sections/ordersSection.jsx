import { useState } from "react";
import hero from "../../../../assets/Brand/category/categoryUno.webp";
import { userOrders as orders } from "../../../../data/users.js";
import OrdersFilters from "../components/orders/OrdersFilters";
import OrdersListComponent from "../components/orders/OrdersListComponent";
import TrackingSidebarComponent from "../components/orders/TrackingSidebarComponent";
import OrderDetailsModal from "../../../../components/ui/OrderDetailsModal";
import SupportCard from "../components/orders/SupportCard";

export default function OrdersSection() {
  const [filter, setFilter] = useState("Todos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(orders[0]);
  const [detailsOrder, setDetailsOrder] = useState(null);
  const visible = orders.filter((order) => (filter === "Todos" || order.status === filter) && order.id.toLowerCase().includes(query.trim().toLowerCase()));
  return <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden bg-[#f6f7f8] lg:h-screen dark:bg-[#0f0f11]"><header className="relative isolate flex min-h-44 shrink-0 items-center overflow-hidden bg-neutral-200 sm:min-h-48"><img src={hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80"/><div className="absolute inset-0 -z-10 bg-linear-to-r from-white dark:from-[#0f0f11] via-white/85 dark:via-[#0f0f11]/90 to-transparent"/><div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10"><p className="text-[10px] font-bold tracking-[.16em] text-neutral-600 dark:text-neutral-300">MI CUENTA <span className="mx-2 text-red-700">/</span> PEDIDOS</p><h1 className="mt-2 font-display text-4xl font-black text-neutral-950 sm:text-5xl dark:text-white">Pedidos</h1><p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">Consulta el estado de tus pedidos, realiza seguimiento y revisa todos los detalles.</p></div></header><div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col gap-4 overflow-y-auto px-4 pb-5 pt-4 [scrollbar-width:none] sm:px-6 lg:overflow-hidden lg:px-10 [&::-webkit-scrollbar]:hidden"><div className="shrink-0"><OrdersFilters summary orders={orders} filter={filter} onFilter={setFilter}/></div><div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-12"><div className="flex min-h-[460px] min-w-0 flex-col gap-3 lg:col-span-8 lg:min-h-0"><OrdersFilters orders={orders} filter={filter} onFilter={setFilter} query={query} onQuery={setQuery}/><OrdersListComponent orders={visible} selected={selected} onSelect={setSelected} onViewDetails={setDetailsOrder}/><SupportCard/></div><div className="min-h-[570px] min-w-0 lg:col-span-4 lg:min-h-0"><TrackingSidebarComponent order={selected} orders={orders} onSelect={setSelected}/></div></div></div><OrderDetailsModal order={detailsOrder} onClose={() => setDetailsOrder(null)}/></div>;
}
