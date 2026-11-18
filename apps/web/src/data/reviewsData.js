import profile from '../assets/Profile/imagesProfile.webp'
import photoOne from '../assets/Sections/homespages/outlet/products/outletUno.webp'
import photoTwo from '../assets/Sections/homespages/outlet/products/ouletDos.webp'
import photoThree from '../assets/Sections/homespages/outlet/products/outletTres.webp'

export const reviewsData = [{ id: 'review-1', name: 'Alejandro Aguilón', date: '12 oct. 2026 · 10:24', rating: 5, comment: 'Excelente calidad y una prenda muy cómoda.', avatar: profile, images: [photoOne, photoTwo, photoThree] }]

export const productDetailsData = [
  { id: 'description', title: 'Descripción', content: 'La Nocturne Oversize Tee redefine el básico urbano con una silueta arquitectónica y un drapeado impecable. Construida en algodón premium de alto gramaje, mantiene una forma boxy y una caída limpia durante el uso.', highlight: 'Algodón pesado de 280 gsm. Cuello en rib grueso, hombros caídos y acabado mate profundo.' },
  { id: 'composition', title: 'Composición', content: '100% algodón premium. Tejido de punto compacto, prelavado para conservar su estructura y tacto.' },
  { id: 'shipping', title: 'Envíos', content: 'Despachamos a toda Colombia. Recibirás el número de guía por correo cuando tu pedido sea entregado a la transportadora.' },
  { id: 'reviews', title: 'Reseñas' },
]

export const productReturnsData = { title: 'Devolución', content: 'Tienes hasta 30 días calendario desde la entrega para solicitar cambios o devoluciones, siempre que la prenda conserve etiquetas y estado original.' }
