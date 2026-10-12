export default function IconActionButton({ icon: Icon, label, onClick }) {
  return <button type="button" aria-label={label} onClick={onClick} className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-dark-950 text-dark-white transition-colors hover:bg-dark-red"><Icon size={15} /></button>
}
