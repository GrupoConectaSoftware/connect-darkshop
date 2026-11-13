import hero from "../../../../assets/Brand/category/categoryUno.webp";
import BansTableComponent from "../components/reports/BansTableComponent";
import BansSidebarComponent from "../components/reports/BansSidebarComponent";

const reports = [
  { id: "#001", user: "@urbanstyle.co", account: "Tienda", type: "Producto", reason: "Contenido inapropiado", content: "Camiseta con diseño de otra marca", date: "2026-10-12", status: "En revisión" },
  { id: "#002", user: "@streetmode", account: "Tienda", type: "Usuario", reason: "Lenguaje ofensivo", content: "Comentarios en productos", date: "2026-10-10", status: "Resuelto" },
  { id: "#003", user: "@darkwear_", account: "Usuario", type: "Comentario", reason: "Spam", content: "Comentario repetitivo en varias tiendas", date: "2026-10-08", status: "Resuelto" },
  { id: "#004", user: "@urbancept", account: "Tienda", type: "Producto", reason: "Falsificación", content: "Uso de logos ajenos", date: "2026-10-05", status: "Sancionado" },
  { id: "#005", user: "@luis_mrtnz", account: "Usuario", type: "Usuario", reason: "Acoso", content: "Mensaje directo inapropiado", date: "2026-10-02", status: "En revisión" },
  { id: "#006", user: "@blacktrend", account: "Tienda", type: "Producto", reason: "Contenido engañoso", content: "Imágenes que no corresponden al producto", date: "2026-09-28", status: "Resuelto" },
  { id: "#007", user: "@shadowfit", account: "Usuario", type: "Usuario", reason: "Suplantación de identidad", content: "Perfil falso", date: "2026-09-25", status: "Descartado" },
  { id: "#008", user: "@estilocali", account: "Tienda", type: "Producto", reason: "Venta de copias", content: "Copia de diseño registrado", date: "2026-09-20", status: "Sancionado" },
];

export default function ModerationReportsSection() {
  return <div className="flex h-[calc(100vh-4rem)] min-h-0 flex-col overflow-hidden bg-[#f6f7f8] lg:h-screen">
    <header className="relative isolate flex min-h-40 shrink-0 items-center overflow-hidden bg-neutral-200 sm:min-h-44"><img src={hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80"/><div className="absolute inset-0 -z-10 bg-linear-to-r from-white via-white/85 to-transparent"/><div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10"><p className="text-[10px] font-bold tracking-[.16em] text-neutral-600">MI CUENTA <span className="mx-2 text-red-700">/</span> REPORTES <span className="mx-2 text-red-700">/</span> BANEOS</p><h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">Reportes de baneos</h1><p className="mt-2 text-sm text-neutral-600">Revisa los reportes que has enviado y el estado de revisión.</p><p className="mt-2 text-[10px] text-neutral-500">Datos de muestra</p></div></header>
    <div className="mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 gap-4 overflow-y-auto px-4 pb-5 pt-4 [scrollbar-width:none] sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:overflow-hidden lg:px-10 [&::-webkit-scrollbar]:hidden"><div className="flex min-h-[420px] flex-col lg:min-h-0"><BansTableComponent reports={reports}/></div><div className="min-h-0 lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"><BansSidebarComponent reports={reports}/></div></div>
  </div>;
}
