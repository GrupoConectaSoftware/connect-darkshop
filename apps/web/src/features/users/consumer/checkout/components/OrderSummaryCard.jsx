import { Info, Package } from "lucide-react";

export default function OrderSummaryCard({
  items = [],
  shipping,
  total,
  money,
  onShowDetails,
}) {
  return (
    <section className="mb-4 rounded-2xl bg-gray-50 dark:bg-[#222226] p-4 dark:bg-[#0f0f11]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Package aria-hidden="true" size={15} className="shrink-0" />
          <span className="truncate text-xs font-bold text-gray-900 dark:text-white">
            Pedido #DS-00241
          </span>
          <button
            type="button"
            onClick={onShowDetails}
            aria-label="Ver detalles del pedido"
            className="shrink-0 rounded-full p-1 text-gray-500 transition-colors hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-gray-400"
          >
            <Info aria-hidden="true" size={16} />
          </button>
        </div>
        <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">
          {items.length} productos
        </span>
      </div>

      <div className="mt-3 space-y-2 border-t border-gray-200 dark:border-neutral-700 pt-3 dark:border-[#2a2a2d]">
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Costo de envío</span>
          <span>{money.format(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm font-black text-gray-950 dark:text-white">
          <span>Total</span>
          <span>{money.format(total)}</span>
        </div>
      </div>
    </section>
  );
}
