import { ArrowRight, FileText } from "lucide-react";
export default function ExportWidget({ data }) {
  const download = () => {
    const csv = ['Pedido,Fecha,Productos,Total,Estado', ...data.map((o) => `${o.id},${o.date},${o.products},${o.total},${o.status}`)].join('\n');
    const url = URL.createObjectURL(new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'reporte-pedidos.csv'; link.click(); URL.revokeObjectURL(url);
  };
  return <section className="rounded-xl border border-neutral-200 bg-white p-5"><div className="flex gap-3"><FileText size={21} /><div><h2 className="font-bold">Exportar reportes</h2><p className="text-xs text-neutral-500">Descarga un resumen de tu actividad.</p></div></div><div className="mt-4 space-y-2">{['PDF', 'Excel', 'CSV'].map((format) => <button key={format} type="button" disabled={format !== 'CSV' || !data.length} onClick={download} className="flex w-full items-center gap-3 rounded-lg bg-neutral-100 px-3 py-2.5 text-left text-xs font-semibold transition-colors enabled:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-45"><FileText size={17} /><span className="flex-1">Exportar en {format}</span><ArrowRight size={15} /></button>)}</div></section>;
}
