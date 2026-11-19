import ChartTooltip from './ChartTooltip'
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useTheme } from "../../../../../context/ThemeContext";

export default function MonthlySpendChart({ data }) {
  const { isDark } = useTheme();
  const axisColor = isDark ? "#a1a1aa" : "#737373";
  const gridColor = isDark ? "#3f3f46" : "#e5e5e5";

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white p-4 sm:p-5 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
      <div className="flex items-center gap-3">
        <BarChart3 size={21} />
        <div>
          <h2 className="font-bold">Gasto por mes</h2>
          <p className="text-xs text-neutral-500 dark:text-gray-400">Total de tus compras en el periodo.</p>
        </div>
      </div>
      {data.length ? (
        <div className="mt-5 h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 0, right: 5 }}>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: axisColor }} tickLine={false} axisLine={false} />
              <YAxis width={55} tickFormatter={(value) => `$${Math.round(value / 1000)}k`} tick={{ fontSize: 10, fill: axisColor }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: isDark ? "#ffffff0a" : "#17171708" }} formatter={(value) => [`$ ${Number(value).toLocaleString("es-CO")}`, "Gasto"]} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {data.map((item, index) => (
                  <Cell key={item.month} fill={index === data.length - 1 ? (isDark ? "#ef4444" : "#c0000a") : (isDark ? "#e5e5e5" : "#171717")} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-16 text-center text-sm text-neutral-500 dark:text-gray-400">Sin registros de gastos</p>
      )}
    </section>
  );
}
