export default function StoresHero({ image }) {
  return (
    <section className="relative aspect-[2/1] overflow-hidden bg-dark-950 sm:aspect-[4/1] lg:aspect-[5608/1128]" aria-labelledby="stores-title">
      <img src={image} alt="Encuentra tu estilo en cada ciudad" className="absolute inset-0 size-full object-cover object-left sm:object-center" />
      <h1 id="stores-title" className="sr-only">Encuentra tu estilo en cada ciudad</h1>
    </section>
  )
}
