import { CheckCircle, Download, XCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PaymentResult({ status, onRetry }) {
  const navigate = useNavigate()
  const success = status === 'success'
  const downloadReceipt = () => {
    const receipt = new Blob(['DARKSHOP\nComprobante de pago\nPedido: #DS-00241\nTotal: $ 251.630\nEstado: Aprobado'], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(receipt)
    const link = document.createElement('a')
    link.href = url
    link.download = 'comprobante-darkshop-DS-00241.txt'
    link.click()
    URL.revokeObjectURL(url)
  }
  if (!success) return <div className="flex min-h-92 w-full flex-col items-center justify-center text-center"><XCircle className="mb-4 size-16 text-red-600"/><h1 className="text-2xl font-black text-gray-900">Pago rechazado</h1><p className="mt-2 text-sm leading-relaxed text-gray-500">No pudimos procesar tu pago. Verifica los datos de tu tarjeta o intenta con otro método.</p><button type="button" onClick={onRetry} className="mt-8 w-full rounded-lg bg-black py-3.5 text-sm font-bold text-white transition-colors hover:bg-gray-800">Intentar de nuevo</button></div>
  return <div className="flex min-h-92 w-full flex-col items-center justify-center text-center"><CheckCircle className="mb-4 size-16 text-emerald-500"/><h1 className="text-2xl font-black text-gray-900">¡Pago exitoso!</h1><p className="mb-8 mt-2 max-w-sm text-sm leading-relaxed text-gray-500">Tu pedido ha sido confirmado. Te enviaremos un correo con los detalles.</p><button type="button" onClick={() => navigate('/dashboard')} className="w-full rounded-lg bg-black py-3.5 text-sm font-bold text-white transition-colors hover:bg-gray-800">Ver mi pedido</button><button type="button" onClick={downloadReceipt} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-transparent py-3.5 text-sm font-bold text-gray-800 transition-colors hover:bg-gray-50"><Download size={17}/>Descargar comprobante</button></div>
}
