import { MapPin } from 'lucide-react'
export default function MapComponent({ locationData }) {
  const query = encodeURIComponent([locationData.address, locationData.neighborhood, locationData.city || 'Cali', locationData.department || 'Valle del Cauca', 'Colombia'].filter(Boolean).join(', '))
  return <div><h3 className="mb-2 font-bold">Vista previa de la ubicación</h3><div className="relative h-48 overflow-hidden rounded-xl bg-neutral-200 sm:h-56"><iframe title="Mapa de ubicación" src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`} className="absolute inset-0 size-full border-0 grayscale-[.35]" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><span className="pointer-events-none absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-red-600 text-white shadow-lg"><MapPin size={22} fill="currentColor"/></span></div></div>
}
