import ChartTooltip from './ChartTooltip'
import { PieChart as PieIcon } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../../../../../context/ThemeContext";

const lightColors = ["#171717", "#525252", "#737373", "#a3a3a3", "#d4d4d4"];
const darkColors = ["#ef4444", "#e5e5e5", "#a1a1aa", "#71717a", "#52525b"];
const lightLegend = ["bg-neutral-900", "bg-neutral-600", "bg-neutral-500", "bg-neutral-400", "bg-neutral-300"];
const darkLegend = ["bg-red-500", "bg-neutral-200", "bg-neutral-400", "bg-neutral-500", "bg-neutral-600"];

export default function CategoryPieChart({ data }) {
  const { isDark } = useTheme();
  const colors = isDark ? darkColors : lightColors;
  const legendColors = isDark ? darkLegend : lightLegend;

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white p-4 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
      <div className="flex items-center gap-3">
        <PieIcon size={20} />
        <div>
          <h2 className="font-bold">Compras por categoría</h2>
          <p className="text-xs text-neutral-500 dark:text-gray-400">Distribución de tus compras.</p>
        </div>
      </div>
      {data.length ? (
        <div className="mt-3 flex items-center gap-3">
          <div className="h-36 w-36 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
                  {data.map((item, index) => <Cell key={item.name} fill={colors[index % colors.length]} stroke={isDark ? "#1a1a1d" : "#fff"} strokeWidth={2} />)}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Compras"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="min-w-0 flex-1 space-y-2">
            {data.map((item, index) => (
              <li key={item.name} className="flex items-center gap-2 text-xs">
                <span className={`size-2 shrink-0 rounded-full ${legendColors[index % legendColors.length]}`} />
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
                <span className="tabular-nums">{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-neutral-500 dark:text-gray-400">No has comprado por categorías</p>
      )}
    </section>
  );
}
