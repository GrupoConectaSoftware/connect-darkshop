import OrderCard from "./OrderCard";
export default function OrdersListComponent({ orders, selected, onSelect, onViewDetails }) {
  return <div tabIndex={0} aria-label="Lista de pedidos" className="min-h-0 flex-1 space-y-2 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{orders.length ? orders.map((order) => <OrderCard key={order.id} order={order} selected={selected?.id === order.id} onSelect={onSelect} onViewDetails={onViewDetails}/>) : <p className="rounded-lg bg-white p-8 text-center text-sm text-neutral-500 dark:bg-[#1a1a1d] dark:text-gray-400">No encontramos pedidos con estos filtros.</p>}</div>;
}
