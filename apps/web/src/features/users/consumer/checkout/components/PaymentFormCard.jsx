import { useEffect, useRef, useState } from "react";
import { CreditCard, Lock, Loader2 } from "lucide-react";
import OrderSummaryCard from "./OrderSummaryCard";
import OrderInfoModal from "./OrderInfoModal";
import { paymentMethodsData as methods } from "../../../../../data/checkout.js";
import wompi from "../../../../../assets/payments/wompi.svg";
import { productsData } from "../../../../../data/products.js";
import { showToast } from "../../../../../utils/toast";

const money = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function CardFields() {
  return (
    <div className="grid h-full content-start gap-3 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-bold text-gray-700 dark:text-gray-200 dark:text-gray-300">
          Número de tarjeta
        </span>
        <span className="flex items-center rounded-xl border border-gray-200 dark:border-neutral-700 bg-white px-3 focus-within:ring-2 focus-within:ring-red-500 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
          <CreditCard size={17} className="mr-2 text-gray-400" />
          <input
            className="h-11 w-full outline-none placeholder:text-gray-400"
            placeholder="0000 0000 0000 0000"
            inputMode="numeric"
          />
        </span>
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-gray-700 dark:text-gray-200 dark:text-gray-300">
          Fecha de expiración
        </span>
        <input
          className="h-11 w-full rounded-xl border border-gray-200 dark:border-neutral-700 px-3 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 dark:border-[#2a2a2d]"
          placeholder="MM/AA"
        />
      </label>
      <label>
        <span className="mb-1.5 block text-xs font-bold text-gray-700 dark:text-gray-200 dark:text-gray-300">
          CVC
        </span>
        <span className="flex items-center rounded-xl border border-gray-200 dark:border-neutral-700 px-3 focus-within:ring-2 focus-within:ring-red-500 dark:border-[#2a2a2d]">
          <input
            className="h-11 w-full outline-none placeholder:text-gray-400"
            placeholder="123"
          />
          <Lock size={16} className="text-gray-400" />
        </span>
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-bold text-gray-700 dark:text-gray-200 dark:text-gray-300">
          Nombre en la tarjeta
        </span>
        <input
          className="h-11 w-full rounded-xl border border-gray-200 dark:border-neutral-700 px-3 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 dark:border-[#2a2a2d]"
          placeholder="Como aparece en la tarjeta"
        />
      </label>
      <label className="sm:col-span-2">
        <span className="mb-1.5 block text-xs font-bold text-gray-700 dark:text-gray-200 dark:text-gray-300">
          Cuotas
        </span>
        <select className="h-11 w-full rounded-xl border border-gray-200 dark:border-neutral-700 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-red-500 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
          <option>1 cuota</option>
          <option>2 cuotas</option>
          <option>3 cuotas</option>
        </select>
      </label>
    </div>
  );
}

export default function PaymentFormCard({ onPay }) {
  const [method, setMethod] = useState("card");
  const [paying, setPaying] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => () => clearTimeout(timerRef.current), []);
  const startPayment = () => {
    setPaying(true);
    const toastId = showToast("loading", "Procesando tu pago de forma segura.");
    timerRef.current = setTimeout(() => onPay(toastId), 400);
  };
  const items = productsData.slice(0, 3);
  const shipping = 10000;
  const total = items.reduce((sum, item) => sum + item.price, 0) + shipping;
  const selectedMethod = methods.find((item) => item.id === method);
  const methodCopy = {
    pse: "Paga desde tu banco con PSE",
    nequi: "Paga desde tu cuenta Nequi",
    bancolombia: "Paga desde Bancolombia",
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-black tracking-tight text-gray-950 dark:text-white">
        Finalizar compra
      </h1>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Completa tus datos para procesar el pago.
      </p>

      <div className="mt-5 grid h-12 w-full grid-cols-4 gap-2">
        {methods.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMethod(item.id)}
            aria-label={`Pagar con ${item.label}`}
            aria-pressed={method === item.id}
            className={`!flex !h-12 !w-full !min-w-0 items-center justify-center overflow-hidden rounded-xl border px-2 transition-colors ${method === item.id ? "border-black bg-white shadow-sm" : "border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#222226] opacity-70 hover:border-gray-300"}`}
          >
            <img
              src={item.logo}
              alt={item.label}
              className="!h-6 md:!h-8 !w-auto !max-w-[80%] object-contain"
            />
          </button>
        ))}
      </div>

      <OrderSummaryCard
        items={items}
        shipping={shipping}
        total={total}
        money={money}
        onShowDetails={() => setIsInfoOpen(true)}
      />

      <div className="mt-4 h-[360px] w-full">
        {method === "card" ? (
          <CardFields />
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#222226] p-6 text-center dark:border-[#2a2a2d] dark:bg-[#0f0f11]">
            <img
              src={selectedMethod.logo}
              alt={selectedMethod.label}
              className="mb-4 h-12 max-w-40 object-contain"
            />
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              {methodCopy[method]}
            </p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Al continuar, te guiaremos para autorizar tu pago de forma segura.
            </p>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={startPayment}
        disabled={paying}
        className="-mt-12 w-full rounded-xl bg-red-600 py-2 text-base font-bold text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        {paying ? (
          <Loader2
            aria-label="Procesando pago"
            className="mx-auto animate-spin"
            size={20}
          />
        ) : (
          <>Pagar {money.format(total)}</>
        )}
      </button>
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <Lock size={13} className="text-emerald-600" />
        <span>Compra protegida con</span>
        <img src={wompi} alt="Wompi" className="h-5 w-14 object-contain" />
      </div>
      <OrderInfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        items={items}
        shipping={shipping}
        total={total}
        money={money}
      />
    </div>
  );
}
