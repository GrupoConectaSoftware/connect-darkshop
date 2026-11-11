import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function CartComponent({ items }) {
  const quantity = new Set(items.map((item) => item.id)).size;
  return (
    <section className="h-full rounded-xl bg-white p-5 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart size={24} />
          <h2 className="font-bold">Carrito compras</h2>
        </div>
        <Link
          to="/cart"
          aria-label="Ver carrito"
          className="rounded-full border border-neutral-300 p-1 transition hover:border-red-700 hover:text-red-700"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
      <p className="mt-2 text-xs text-neutral-500">
        {quantity} productos ingresados
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.length ? (
          items
            .slice(-5)
            .reverse()
            .map((item, index) => (
              <img
                key={`${item.id}-${item.size}-${index}`}
                src={item.image}
                alt={item.name}
                className="h-16 w-12 rounded object-cover"
              />
            ))
        ) : (
          <p className="text-sm text-neutral-500">Tu carrito está vacío.</p>
        )}
      </div>
    </section>
  );
}
