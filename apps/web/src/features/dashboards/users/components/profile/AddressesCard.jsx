import { useState } from "react";
import { MapPin, MoreHorizontal, Plus, X } from "lucide-react";

const initialAddresses = [
  { id: 1, label: "Dirección principal", lines: ["Cra. 12D # 58-09, La Base", "Cali, Colombia"], primary: true },
  { id: 2, label: "Dirección laboral", lines: ["Oficina principal", "Cali, Colombia"], primary: false },
];

export default function AddressesCard() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [adding, setAdding] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const addAddress = (event) => {
    event.preventDefault();
    const value = newAddress.trim();
    if (!value) return;
    setAddresses((current) => [...current, { id: Date.now(), label: "Nueva dirección", lines: [value, "Cali, Colombia"], primary: false }]);
    setNewAddress("");
    setAdding(false);
  };

  return (
    <section className="rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-md sm:p-6" aria-labelledby="addresses-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><MapPin size={19} strokeWidth={1.7} /></span><div><h2 id="addresses-title" className="text-sm font-bold sm:text-base">Direcciones</h2><p className="text-xs text-neutral-500">Administra dónde recibes tus pedidos.</p></div></div>
        <button type="button" onClick={() => setAdding((value) => !value)} className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-red-800">{adding ? <X size={15} /> : <Plus size={15} />}{adding ? "Cancelar" : "Agregar dirección"}</button>
      </div>
      {adding && <form onSubmit={addAddress} className="mt-5 flex flex-col gap-2 sm:flex-row"><input autoFocus value={newAddress} onChange={(event) => setNewAddress(event.target.value)} placeholder="Escribe la dirección" className="min-w-0 flex-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-3 text-sm outline-none focus:border-red-700" /><button className="rounded-lg bg-red-800 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700">Guardar</button></form>}
      <div className="mt-4 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="space-y-2.5">
          {addresses.map((address) => (
            <article key={address.id} className="flex items-start gap-3 rounded-lg border border-neutral-200/50 bg-neutral-50 p-4 transition-colors hover:bg-neutral-100">
              <span className={`mt-1.5 size-2.5 shrink-0 rounded-full ${address.primary ? "bg-red-800" : "bg-neutral-400"}`} />
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-bold">{address.label}</h3>
                {address.lines.map((line) => <p key={line} className="mt-1 text-xs leading-relaxed text-neutral-500">{line}</p>)}
              </div>
              <button type="button" onClick={() => setAddresses((current) => current.map((item) => ({ ...item, primary: item.id === address.id })))} aria-label={`Establecer ${address.label} como principal`} className="rounded-full p-1 text-neutral-500 transition-colors hover:text-red-700"><MoreHorizontal size={18} /></button>
            </article>
          ))}
        </div>
        <div className="relative min-h-52 overflow-hidden rounded-lg border border-neutral-200 bg-[linear-gradient(135deg,#e5e7eb_25%,transparent_25%),linear-gradient(225deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(315deg,#e5e7eb_25%,#f3f4f6_25%)] bg-size-[36px_36px]g:min-h-full">
          <iframe title="Mapa de direcciones en Cali" src="https://maps.google.com/maps?q=Cali%2C%20Colombia&z=14&output=embed" className="absolute inset-0 h-full w-full border-0 grayscale-[.2]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-800 text-white shadow-lg"><MapPin size={19} fill="currentColor" /></span>
        </div>
      </div>
    </section>
  );
}
