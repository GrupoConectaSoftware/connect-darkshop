export default function StoresHero({ image }) {
  return (
    <section className="relative overflow-hidden bg-dark-950" aria-labelledby="stores-title">
      <img src={image} alt="Encuentra tu estilo en cada ciudad" className="h-full min-h-52 w-full object-cover sm:min-h-64 lg:min-h-[min(40vh,31rem)]" />
      <h1 id="stores-title" className="sr-only">Encuentra tu estilo en cada ciudad</h1>
    </section>
  )
}
