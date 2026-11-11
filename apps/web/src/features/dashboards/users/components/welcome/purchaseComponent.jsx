import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function PurchaseComponent({ product }) {
  return (
    <section className="h-full rounded-xl bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag size={24} />
          <h2 className="font-bold">Última compra</h2>
        </div>
        <Link
          to="/dashboard"
          aria-label="Ver compras"
          className="rounded-full border border-neutral-300 p-1 transition hover:border-red-700 hover:text-red-700"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
      {product ? (
        <div className="mt-4 flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="h-20 w-16 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-neutral-400">
              24 septiembre 2025
            </p>
            <p className="mt-1 line-clamp-2 text-xs font-semibold">
              {product.name}
            </p>
            <p className="mt-2 font-bold text-red-800">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0,
              }).format(product.price)}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-sm text-neutral-500">Aún no tienes compras.</p>
      )}
    </section>
  );
}
