import { useRef, useState } from "react";
import { Camera, ImagePlus, Trash2, Upload } from "lucide-react";
import defaultAvatar from "../../../../../assets/Profile/imagesProfile.webp";

export default function ProfilePictureCard() {
  const inputRef = useRef(null);
  const [photo, setPhoto] = useState(defaultAvatar);

  const selectPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      event.target.value = "";
      return;
    }
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <section className="h-full min-h-60 rounded-xl border border-neutral-200/80 bg-white p-5 shadow-[0_5px_18px_rgba(15,23,42,0.05)] transition-shadow duration-300 hover:shadow-md sm:p-6" aria-labelledby="profile-photo-title">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-red-50 text-red-800"><Camera size={19} strokeWidth={1.7} /></span>
        <div>
          <h2 id="profile-photo-title" className="text-sm font-bold sm:text-base">Foto de perfil</h2>
          <p className="text-xs text-neutral-500">Elige una foto clara para que sea legible para DarkShop.</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-5">
        <div className="relative">
          <img src={photo} alt="Vista previa de perfil" className="size-24 rounded-full border-4 border-white object-cover shadow-[0_4px_14px_rgba(15,23,42,0.14)] sm:size-28" />
          <span className="absolute bottom-0 right-0 grid size-8 place-items-center rounded-full bg-neutral-950 text-white"><Camera size={15} /></span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">Cambia tu foto de perfil</p>
          <p className="mt-1 text-xs text-neutral-500">JPG, PNG o WEBP. Máximo 5 MB.</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg bg-neutral-950 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-800"><Upload size={14} /> Subir imagen</button>
            <button type="button" onClick={() => setPhoto(defaultAvatar)} className="inline-flex items-center gap-2 px-2 py-2 text-xs text-neutral-500 transition-colors hover:text-red-700"><Trash2 size={14} /> Eliminar</button>
            <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={selectPhoto} className="sr-only" aria-label="Seleccionar foto de perfil" />
          </div>
        </div>
        <ImagePlus className="hidden text-neutral-300 sm:block" size={22} strokeWidth={1.5} />
      </div>
    </section>
  );
}
