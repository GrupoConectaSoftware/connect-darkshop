import { Fingerprint } from "lucide-react";
import heroImage from "../../../../assets/Brand/category/categoryUno.webp";
import PasswordComponent from "../components/security/passwordComponent";
import InformationComponent from "../components/security/informationComponent";
import SessionComponent from "../components/security/sesionComponent";
import HistoryComponent from "../components/security/historyComponent";

export default function SecuritySection() {
  return (
    <div className="h-full w-full bg-[#f6f7f8] pb-10">
      <header className="relative isolate flex min-h-62.5 items-center overflow-hidden bg-neutral-200 sm:min-h-67.5 lg:min-h-75">
        <img src={heroImage} alt="" className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-80" />
        <div className="absolute inset-0 z-0 bg-linear-to-r from-white via-white/75 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 py-9 sm:px-8 lg:px-10">
          <p className="text-[10px] font-bold tracking-[.2em] text-neutral-600 sm:text-xs">MI CUENTA <span className="mx-2 text-red-700">/</span> SEGURIDAD</p>
          <h1 className="mt-2 font-display text-4xl font-black leading-none text-neutral-800 sm:text-5xl">Seguridad</h1>
          <span className="mt-4 block h-1 w-12 rounded-full bg-red-700" />
          <p className="mt-3 text-sm font-semibold text-neutral-800 sm:text-base">Tu cuenta, siempre protegida</p>
          <p className="mt-1.5 max-w-md text-xs leading-relaxed text-neutral-600 sm:text-sm">Administra la seguridad de tu cuenta y consulta la actividad de tus dispositivos.</p>
        </div>
      </header>
      <div className="relative z-10 mx-auto -mt-9 grid max-w-[1600px] gap-4 px-4 sm:px-6 lg:-mt-11 lg:gap-5 lg:px-10">
        <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5"><PasswordComponent /><InformationComponent /></div>
        <div className="grid items-stretch gap-4 lg:grid-cols-2 lg:gap-5"><SessionComponent /><HistoryComponent /></div>
        <div className="flex items-center gap-4 rounded-xl bg-neutral-950 px-5 py-5 text-white sm:px-6"><span className="grid size-11 shrink-0 place-items-center rounded-lg bg-white/10 text-red-400"><Fingerprint size={23} /></span><div><h2 className="text-sm font-bold">Tu seguridad es importante</h2><p className="mt-1 text-xs leading-relaxed text-neutral-400">Mantén tu cuenta protegida y evita accesos no autorizados.</p></div></div>
      </div>
    </div>
  );
}
