const TOAST_EVENT = 'darkshop:toast'
const TOAST_DISMISS_EVENT = 'darkshop:toast-dismiss'

let sequence = 0

export function showToast(type, message, options = {}) {
  if (typeof window === 'undefined' || !message) return null
  const id = options.id ?? `toast-${Date.now()}-${sequence++}`
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, {
    detail: { id, type, message, duration: options.duration },
  }))
  return id
}

export function dismissToast(id) {
  if (typeof window === 'undefined' || !id) return
  window.dispatchEvent(new CustomEvent(TOAST_DISMISS_EVENT, { detail: { id } }))
}

export { TOAST_EVENT, TOAST_DISMISS_EVENT }
