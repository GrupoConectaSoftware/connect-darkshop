import { Tag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function BrandBarChart({ data }) {
  return <section className="rounded-xl border border-neutral-200 bg-white p-4"><div className="flex items-center gap-3"><Tag size={20} /><div><h2 className="font-bold">Compras por marca</h2><p className="text-xs text-neutral-500">Marcas que más has comprado.</p></div></div>{data.length ? <div className="mt-3 h-36"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ left: 0, right: 15 }}><XAxis type="number" hide /><YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} /><Tooltip cursor={false} formatter={(v) => `${v}%`} /><Bar dataKey="value" fill="#171717" radius={[0, 4, 4, 0]} barSize={9} /></BarChart></ResponsiveContainer></div> : <p className="py-12 text-center text-sm text-neutral-500">Sin marcas compradas</p>}</section>;
}

