import image from '../../../../../../assets/Location/presentationLocation.webp'
export default function PresentationComponent() {
  return <div className="relative min-h-48 overflow-hidden bg-neutral-950 md:min-h-full md:w-2/5"><img src={image} alt="" className="absolute inset-0 size-full object-cover" /></div>
}
