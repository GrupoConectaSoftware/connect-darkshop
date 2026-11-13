import { Package } from "lucide-react";

export default function RecentOrdersTable({ data }) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Package size={21} />
        <div>
          <h2 className="font-bold">Últimos pedidos</h2>
          <p className="text-xs text-neutral-500">Tus compras más recientes.</p>
        </div>
      </div>
      {data.length ? (
        <div className="mt-4 max-h-56 overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <table className="w-full min-w-[500px] text-left text-xs">
            <thead className="sticky top-0 border-b border-neutral-200 bg-white text-neutral-500">
              <tr>{["Pedido", "Fecha", "Productos", "Total", "Estado"].map((label) => <th key={label} className="pb-3 pr-3 font-medium">{label}</th>)}</tr>
            </thead>
            <tbody>{data.map((order) => (
              <tr key={order.id} className="border-b border-neutral-100 last:border-0">
                <td className="py-3 pr-3 font-bold">{order.id}</td>
                <td className="pr-3 text-neutral-500">{order.date}</td>
                <td className="pr-3">{order.products}</td>
                <td className="pr-3 font-semibold">$ {order.total.toLocaleString("es-CO")}</td>
                <td><span className="rounded-full bg-neutral-100 px-2 py-1 text-neutral-700">{order.status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ) : <p className="py-10 text-center text-sm text-neutral-500">Aún no tienes pedidos registrados</p>}
    </section>
  );
}
