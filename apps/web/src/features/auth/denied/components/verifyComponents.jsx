export default function VerifyComponents({
  email = 'al•••••@gmail.com',
  role = 'Comprador',
  onBack,
  onSettings,
}) {
  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">
        Seguridad
      </p>

      <h1 className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] uppercase leading-[1.05] tracking-[-0.04em] text-neutral-950">
        No tienes acceso a esta vista
      </h1>

      <p className="mb-8 mt-4 max-w-xl font-body text-base font-light leading-snug text-neutral-500 sm:mb-10 sm:text-lg">
        Esta área requiere permisos adicionales que actualmente no están asociados a tu cuenta.
      </p>

      <div className="flex flex-col gap-1 border border-neutral-300 px-4 py-4 font-body text-sm leading-relaxed text-neutral-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:px-6">
        <span>Sesión activa:</span>
        <span className="break-all font-medium text-neutral-900">{email}</span>
        <span className="text-neutral-400">Rol {role}</span>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10">
        <button
          type="button"
          onClick={onBack}
          className="w-full cursor-pointer bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          Volver al comercio
        </button>

        <button
          type="button"
          onClick={onSettings}
          className="w-full cursor-pointer border border-neutral-950 bg-transparent px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.16em] text-neutral-950 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          Configuración de cuenta
        </button>
      </div>
    </div>
  )
}
