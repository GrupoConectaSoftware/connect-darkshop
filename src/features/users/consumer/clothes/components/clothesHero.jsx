export default function ClothesHero({ image }) {
  return (
    <section className="aspect-[4/3] overflow-hidden bg-dark-950 sm:aspect-[1071/288]">
      <img src={image} alt="Nuestro catálogo: ropa, accesorios y más" className="h-full w-full object-cover object-left sm:object-center" />
    </section>
  )
}
