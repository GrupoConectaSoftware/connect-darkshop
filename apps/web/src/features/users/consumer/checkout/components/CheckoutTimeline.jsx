import { Check } from "lucide-react";

const steps = ["Pago recibido", "Verificando pago", "Confirmación"];
export default function CheckoutTimeline({ stage }) {
  const active = stage === "form" ? 0 : stage === "processing" ? 1 : 2;
  return (
    <ol className="relative mt-6 grid grid-cols-3">
      <span className="absolute left-[16.67%] right-[16.67%] top-3.5 h-px bg-gray-200" />
      <span
        className={`absolute left-[16.67%] top-3.5 h-px bg-red-600 transition-all ${active === 0 ? "w-0" : active === 1 ? "right-1/2" : "right-[16.67%]"}`}
      />
      {steps.map((label, index) => (
        <li
          key={label}
          className="relative z-10 flex min-w-0 flex-col items-center text-center"
        >
          <span
            className={`grid size-7 place-items-center rounded-full text-xs font-bold ${index < active ? "bg-neutral-950 text-white" : index === active ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.8)]" : "bg-gray-200 text-gray-500"}`}
          >
            {index < active ? <Check size={14} /> : index + 1}
          </span>
          <span
            className={`mt-2 w-full text-center text-[10px] font-bold leading-tight ${index === active ? "text-red-600" : "text-gray-500"}`}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  );
}
