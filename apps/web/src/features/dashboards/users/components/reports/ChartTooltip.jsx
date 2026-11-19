export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-900 shadow-md dark:border-red-900 dark:bg-[#1a1a1d] dark:text-white">{label != null && <p className="mb-1 font-semibold">{label}</p>}{payload.map((entry, index) => <p key={index}>{entry.name}: {entry.dataKey === 'value' ? entry.value + '%' : Number(entry.value).toLocaleString('es-CO')}</p>)}</div>
}
