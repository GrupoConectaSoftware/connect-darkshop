export default function ExpiredComponents({ onLogin, onBack }) {
  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">
        Cerrar sesión
      </p>
      <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase leading-[1.05] tracking-[-0.04em] text-neutral-950">
        Tu sesión ha terminado
      </h1>
      <p className="mb-10 mt-5 font-body text-base font-light leading-snug text-neutral-500 sm:mb-12 sm:text-lg">
        Por seguridad cerramos tu sesión después de un periodo de inactividad.
      </p>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={onLogin}
          className="min-h-14 w-full cursor-pointer bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          Iniciar sesión nuevamente
        </button>
        <button
          type="button"
          onClick={onBack}
          className="min-h-14 w-full cursor-pointer border border-neutral-950 bg-transparent px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.16em] text-neutral-950 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          Volver al comercio
        </button>
      </div>
    </div>
  )
}
