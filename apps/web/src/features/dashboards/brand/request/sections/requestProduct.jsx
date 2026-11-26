import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { categoriesData } from '../../../../../data/categories'
import RequestCategory from '../products/layouts/requestCategory'
import RequestInfo from '../products/layouts/requestInfo'
import RequestDescription from '../products/layouts/requestDescription'
import RequestVariants from '../products/layouts/requestVariants'
import RequestCollections from '../products/layouts/requestCollections'
import { registerProduct } from '../../../../../hooks/productRegistry'

const steps = [
  [RequestCategory, 'Selecciona una categoría', 'Define el tipo de producto que vas a registrar.'],
  [RequestInfo, 'Información principal', 'Registra el código, nombre y etiquetas comerciales del producto.'],
  [RequestDescription, 'Datos informativos', 'Describe la prenda, su composición y las condiciones de envío.'],
  [RequestVariants, 'Tallaje y variantes', 'Gestiona las tallas, colores, stock e imágenes de cada variante.'],
  [RequestCollections, 'Referencias y submarcas', 'Selecciona la submarca y la colección de este producto.'],
]
const initialData = {
  category: 'camisetas', gender: 'unisex', sku: '', name: '', tags: [], description: '', composition: '', shipping: '',
  variants: [{ id: 'initial', hex: '#FFFFFF', color: '', sizes: [], imagesModel: [null, null, null], imagesClothes: [null, null, null] }], brand: 'DARK', collection: 'angelicales',
}
const categoryDetails = {
  camisetas: 'Prendas superiores de uso diario, disponibles en diferentes cortes y estilos.',
  pantalones: 'Prendas inferiores en distintos cortes y materiales.',
  zapatos: 'Calzado para tus colecciones.', accesorios: 'Complementos para cada estilo.',
  chaquetas: 'Prendas exteriores para completar el look.',
}

export default function RequestProduct() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialData)
  const [error, setError] = useState('')
  const [Step, title, hint] = steps[currentStep - 1]
  const first = currentStep === 1
  const category = categoriesData.find(c => c.id === formData.category)

  function go(step) {
    setError('')
    setCurrentStep(step)
  }
  function update(values) {
    setFormData(prev => ({ ...prev, ...values }))
    setError('')
  }
  function submit(event) {
    event.preventDefault()
    const final = currentStep === steps.length
    if ((currentStep === 2 || final) && (!formData.sku.trim() || !formData.name.trim())) {
      setCurrentStep(2)
      return setError('Escribe el SKU y el nombre de la prenda.')
    }
    if ((currentStep === 4 || final) && (!formData.variants.length || formData.variants.some(v => !v.sizes?.length))) {
      setCurrentStep(4)
      return setError('Añade una variante y usa cantidades enteras de stock desde cero.')
    }
    if (!final) return go(currentStep + 1)
    try {
      registerProduct(formData)
      navigate('/dashboard/brand', { replace: true })
    } catch (err) {
      setError(err instanceof Error && err.message.startsWith('Ya registraste') ? err.message : 'No se pudo guardar el producto en este dispositivo.')
    }
  }
  return <main className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/95 p-2 backdrop-blur-sm sm:p-6">
    <form onSubmit={submit} className="flex h-[min(740px,94dvh)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white text-neutral-950 shadow-2xl dark:bg-neutral-900 dark:text-white">
      <header className="relative shrink-0 border-b border-neutral-200 px-5 py-5 sm:px-8 dark:border-neutral-700">
        <Link to="/dashboard/brand" aria-label="Cerrar registro" className="absolute right-4 top-4 rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"><X size={22} /></Link>
        {first ? <>
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><span className="rounded-full bg-black px-3 py-2 text-white">Paso 1 de 5</span>Registro de producto</p>
          <div className="mt-4 flex items-end justify-between gap-3">
            <div><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Selecciona una <em>categoría</em></h1>
              <div className="my-2 h-1 w-10 rounded-full bg-red-700" /><p>{hint}</p></div>
          </div>
        </> : <nav aria-label="Pasos del registro" className="mr-10 flex overflow-x-auto">
          {steps.slice(1).map(([, name], i) => <button type="button" key={name} onClick={() => go(i + 2)} aria-current={currentStep === i + 2 ? 'step' : undefined}
            className="shrink-0 border-b-2 border-transparent px-3 py-3 text-sm text-neutral-600 aria-[current=step]:border-red-600 aria-[current=step]:font-bold aria-[current=step]:text-black dark:text-neutral-300 dark:aria-[current=step]:text-white">{name}</button>)}
        </nav>}
      </header>
      <div key={currentStep} className={`min-h-0 flex-1 px-5 py-6 sm:px-8 ${first ? 'overflow-hidden' : 'overflow-y-auto'}`}><Step data={formData} update={update} /></div>
      <footer className="shrink-0 border-t border-neutral-200 px-5 py-4 sm:px-8 dark:border-neutral-700">
        {error && <p role="alert" className="mb-2 text-sm text-red-700 dark:text-red-400">{error}</p>}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 flex-1"><strong>{first ? category.label : title}</strong><p className="hidden text-sm text-neutral-600 sm:block dark:text-neutral-300">{first ? categoryDetails[category.id] : hint}</p></div>
          {!first && <button type="button" onClick={() => go(currentStep - 1)} className="px-2 py-2 text-sm font-semibold">Atrás</button>}
          <button type="submit" className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white dark:bg-white dark:text-black">{currentStep === 5 ? 'REGISTRAR PRODUCTO' : 'Continuar'}<ArrowRight size={18} /></button>
        </div>
      </footer>
    </form>
  </main>
}
