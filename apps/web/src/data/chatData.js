import { BadgePercent, CircleHelp, Headphones, Layers, LayoutGrid, Lightbulb, MessageCircle, Package, Radio, ShoppingBag, Store } from 'lucide-react'

export const chatData = [
  { label: 'Ver promociones', icon: BadgePercent, path: '/catalog?category=outlet' },
  { label: 'Ver outlet', icon: ShoppingBag, path: '/catalog?category=outlet' },
  { label: 'Ver catálogo completo', icon: LayoutGrid, path: '/catalog' },
  { label: 'Ver tiendas', icon: Store, path: '/stores' },
  { label: 'Ver colecciones', icon: Layers, path: '/poster' },
  { label: 'Estado de mi pedido', icon: Package, path: '/dashboard?section=orders' },
  { label: 'Ayuda y soporte', icon: Headphones, path: '/legal' },
  { label: 'Preguntas frecuentes', icon: CircleHelp, faq: true },
  { label: 'Sugerencias', icon: Lightbulb, suggestions: true },
  { label: 'Hablar con un asesor', icon: Headphones, advisor: true },
  { label: 'Visitar canales oficiales', icon: Radio, channels: true },
  { label: 'Hablar con DarkMood', icon: MessageCircle, chat: true },
]
