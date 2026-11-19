import ChartTooltip from './ChartTooltip'
import { Tag } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "../../../../../context/ThemeContext";

export default function BrandBarChart({ data }) {
  const { isDark } = useTheme();
  const axisColor = isDark ? "#a1a1aa" : "#737373";

  return (
    <section className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white p-4 dark:border-[#2a2a2d] dark:bg-[#1a1a1d]">
      <div className="flex items-center gap-3">
        <Tag size={20} />
        <div>
          <h2 className="font-bold">Compras por marca</h2>
          <p className="text-xs text-neutral-500 dark:text-gray-400">Marcas que más has comprado.</p>
        </div>
      </div>
      {data.length ? (
        <div className="mt-3 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 15 }}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 10, fill: axisColor }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: isDark ? "#ffffff0a" : "#17171708" }} formatter={(value) => [`${value}%`, "Compras"]} />
              <Bar dataKey="value" fill={isDark ? "#e5e5e5" : "#171717"} radius={[0, 4, 4, 0]} barSize={9} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-12 text-center text-sm text-neutral-500 dark:text-gray-400">Sin marcas compradas</p>
      )}
    </section>
  );
}
