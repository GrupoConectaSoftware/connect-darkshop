import heroImage from "../../../../../assets/Brand/category/categoryUno.webp";

export default function ProfileHero() {
  return (
    <header className="relative isolate flex min-h-62.5 items-center overflow-hidden rounded-sm bg-neutral-200 sm:min-h-67.5 lg:min-h-75">
      <img src={heroImage} alt="" className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-80" />
      <div className="absolute inset-0 z-0 bg-linear-to-r from-white via-white/75 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-9 sm:px-8 lg:px-10">
        <p className="text-[10px] font-bold tracking-[.2em] text-neutral-600 sm:text-xs">MI CUENTA <span className="mx-2 text-red-700">/</span> PERFIL</p>
        <h1 className="mt-2 font-display text-4xl font-black leading-none text-neutral-800 sm:text-5xl">Mi Perfil</h1>
        <span className="mt-4 block h-1 w-12 rounded-full bg-red-700" />
        <p className="mt-3 max-w-xl text-sm font-semibold text-neutral-800 sm:text-base">Administra tu información personal y de contacto</p>
        <p className="mt-1.5 max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">Mantén tus datos actualizados para una mejor experiencia en el ecosistema No. 1 de Colombia: DarkShop.</p>
      </div>
    </header>
  );
}
