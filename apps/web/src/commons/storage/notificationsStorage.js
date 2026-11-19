const READ_IDS_KEY = "darkshop:read-notifications"
export const NOTIFICATIONS_UPDATED_EVENT = "darkshop:notifications-updated"

export function getReadNotificationIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(READ_IDS_KEY) || "[]")
    return new Set(Array.isArray(saved) ? saved.map(String) : [])
  } catch { return new Set() }
}

export function isNotificationRead(notification) {
  return Boolean(notification?.isRead || getReadNotificationIds().has(String(notification?.id)))
}

export function markNotificationRead(id) {
  if (id == null) return
  const ids = getReadNotificationIds()
  const key = String(id)
  if (ids.has(key)) return
  ids.add(key)
  try { localStorage.setItem(READ_IDS_KEY, JSON.stringify([...ids])) } catch { /* Keep this tab in sync. */ }
  window.dispatchEvent(new CustomEvent(NOTIFICATIONS_UPDATED_EVENT, { detail: { id: key } }))
}
