const fields = [
  ['description', 'Descripción de la prenda', 'Describe su estilo, ajuste y detalles clave…', 500],
  ['composition', 'Composición', 'Indica los materiales y cuidados de la prenda…', 300],
  ['shipping', 'Envíos', 'Indica la cobertura y los tiempos de entrega…', 300],
]

export default function RequestDescription({ data, update }) {
  return <div className="space-y-4">{fields.map(([key, label, hint, max]) => (
    <label key={key} className="block font-bold">{label}
      <textarea rows={2} maxLength={max} placeholder={hint} value={data[key]} onChange={e => update({ [key]: e.target.value })}
        className="mt-2 block min-h-[160px] w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 font-normal focus:ring-2 focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 dark:focus:ring-white" />
      <span className="mt-1 block text-right text-xs font-normal text-neutral-500 dark:text-neutral-400">{data[key].length} / {max}</span>
    </label>
  ))}</div>
}
