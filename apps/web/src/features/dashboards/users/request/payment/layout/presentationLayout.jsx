import image from '../../../../../../assets/payments/forms/presetationImages.webp'
export default function PresentationLayout() {
  return <div className="relative min-h-52 overflow-hidden bg-black lg:min-h-full"><img src={image} alt="" className="absolute inset-0 size-full object-cover" /></div>
}
