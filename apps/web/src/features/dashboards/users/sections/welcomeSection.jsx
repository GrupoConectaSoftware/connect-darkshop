import hero from "../../../../assets/Brand/category/categoryUno.webp";
import {
  products,
  orders,
  notifications,
} from "../../../../components/ui/mockData";
import OrderComponent from "../components/welcome/orderComponent";
import PurchaseComponent from "../components/welcome/purchaseComponent";
import CartComponent from "../components/welcome/cartComponent";
import PreferencesComponent from "../components/welcome/preferencesComponent";
import NotificationsComponent from "../components/welcome/notificationsComponent";
import WishlistComponent from "../components/welcome/wishlistComponent";
import { useEffect, useState } from "react";
import {
  CART_UPDATED_EVENT,
  getCart,
} from "../../../../commons/storage/cartStorage";
import {
  FAVORITES_UPDATED_EVENT,
  getFavorites,
} from "../../../../commons/storage/favoritesStorage";

export default function WelcomeSection() {
  const [cart, setCart] = useState(getCart);
  const [favorites, setFavorites] = useState(getFavorites);
  useEffect(() => {
    const sync = () => {
      setCart(getCart());
      setFavorites(getFavorites());
    };
    window.addEventListener(CART_UPDATED_EVENT, sync);
    window.addEventListener(FAVORITES_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync);
      window.removeEventListener(FAVORITES_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-sm bg-neutral-200 px-6 pb-16 pt-8 sm:px-8 lg:min-h-67.5">
        <img
          src={hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white via-white/75 to-transparent" />
        <div className="relative max-w-3xl">
          <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[.95] sm:text-5xl">
            <span className="text-neutral-500">Hola, Alejandro</span>
            <br />
            Todo lo tuyo, <span className="text-[#8b0c1d]">un solo lugar</span>
          </h1>
          <p className="mt-4 max-w-sm text-sm text-neutral-600">
            Consulta tus compras, sigue tus pedidos y administra tu experiencia
            dentro de DarkShop.
          </p>
        </div>
      </div>
      <div className="relative -mt-10 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <OrderComponent orders={orders} />
        </div>
        <div className="lg:col-span-4">
          <PurchaseComponent product={products[0]} />
        </div>
        <div className="lg:col-span-4">
          <CartComponent items={cart} />
        </div>
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PreferencesComponent />
        </div>
        <NotificationsComponent notifications={notifications} />
      </div>
      <div className="mt-5">
        <WishlistComponent products={favorites} fallbackProducts={products} />
      </div>
    </div>
  );
}
