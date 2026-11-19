import { Info } from "lucide-react";
export default function PaymentProcessing() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center text-center">
      <span className="size-20 animate-spin rounded-full border-4 border-gray-200 dark:border-neutral-700 border-t-red-600 dark:border-[#2a2a2d]" />
      <h1 className="mt-6 text-3xl font-black text-gray-900 dark:text-white">
        Procesando tu pago...
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        Estamos verificando la transacción con el proveedor de pago. Esto puede
        tomar unos segundos.
      </p>
      <div className="mt-6 flex max-w-sm gap-3 rounded-xl bg-gray-50 dark:bg-[#222226] p-4 text-left text-xs leading-relaxed text-gray-600 dark:text-gray-300 dark:bg-[#0f0f11]">
        <Info className="size-5 shrink-0 text-red-600" />
        No cierres ni actualices esta ventana mientras terminamos la
        verificación.
      </div>
    </div>
  );
}
