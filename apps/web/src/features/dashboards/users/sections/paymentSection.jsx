import { useState } from 'react';
import AddPayment from '../request/payment/addPayment';
import { CreditCard } from "lucide-react";
import hero from "../../../../assets/Brand/category/categoryUno.webp";
import SavedMethodsComponent from "../components/payment/savedMethodsComponent";
import SecurityWidgetsComponent from "../components/payment/securityWidgetsComponent";

export default function PaymentSection() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  return <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f6f7f8] dark:bg-[#0f0f11]">
    <header className="relative isolate flex min-h-52 shrink-0 items-center overflow-hidden bg-neutral-200 sm:min-h-56 lg:min-h-60">
      <img src={hero} alt="" className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-80" />
      <div className="absolute inset-0 z-0 bg-linear-to-r from-white dark:from-[#0f0f11] via-white/75 dark:via-[#0f0f11]/90 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-9 sm:px-8 lg:px-10">
        <p className="text-[10px] font-bold tracking-[.2em] text-neutral-600 dark:text-neutral-300 sm:text-xs">MI CUENTA <span className="mx-2 text-red-700">/</span> MÉTODOS DE PAGO</p>
        <h1 className="mt-2 font-display text-4xl font-black leading-none text-neutral-800 dark:text-neutral-100 sm:text-5xl">Métodos de pago</h1><span className="mt-4 block h-1 w-12 rounded-full bg-red-700" />
        <p className="mt-3 text-sm font-semibold text-neutral-800 dark:text-neutral-100 sm:text-base">Administra tus métodos de pago de forma segura.</p><p className="mt-1.5 max-w-lg text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-sm">Organiza tus métodos para realizar compras más cómodas en DarkShop.</p>
      </div>
    </header>
    <div className="relative z-10 mx-auto -mt-7 grid min-h-0 w-full max-w-[1600px] flex-1 gap-4 overflow-hidden px-4 pb-5 sm:px-6 lg:-mt-9 lg:grid-cols-3 lg:gap-5 lg:px-10">
      <div className="flex min-h-0 min-w-0 flex-col gap-4 lg:col-span-2 lg:gap-5"><SavedMethodsComponent onAdd={() => setIsAddOpen(true)} /><div className="flex shrink-0 items-center gap-4 rounded-xl bg-neutral-950 p-4 text-white sm:p-5"><CreditCard className="shrink-0 text-red-400" size={23} /><div><h2 className="text-sm font-bold">Tu seguridad es importante</h2><p className="mt-1 text-xs text-neutral-400">Mantén tus métodos de pago actualizados y protege tu información.</p></div></div></div>
      <div className="min-h-0 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"><SecurityWidgetsComponent /></div>
    </div>
    {isAddOpen && <AddPayment onClose={() => setIsAddOpen(false)} />}
  </div>;
}
