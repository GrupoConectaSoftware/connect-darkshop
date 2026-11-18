import { useEffect, useState } from 'react'
import Toast from './Toast'
import { TOAST_DISMISS_EVENT, TOAST_EVENT } from '../../../utils/toast'

export default function ToastViewport() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    const addToast = (event) => {
      const toast = event.detail
      setToasts((current) => [...current.filter((item) => item.id !== toast.id), toast].slice(-4))
    }
    const removeToast = (event) => {
      setToasts((current) => current.filter((item) => item.id !== event.detail?.id))
    }

    window.addEventListener(TOAST_EVENT, addToast)
    window.addEventListener(TOAST_DISMISS_EVENT, removeToast)
    return () => {
      window.removeEventListener(TOAST_EVENT, addToast)
      window.removeEventListener(TOAST_DISMISS_EVENT, removeToast)
    }
  }, [])

  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[200] flex w-[min(92vw,28rem)] flex-col gap-2 sm:right-6 sm:top-6" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
        />
      ))}
    </div>
  )
}
