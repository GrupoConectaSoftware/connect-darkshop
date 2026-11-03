export default function GarmentToggleButton({ icon: Icon, label, active, onClick }) {
  return <button type="button" aria-label={label} aria-pressed={active} onClick={onClick} className={`grid h-9 w-9 cursor-pointer place-items-center rounded-full transition-colors ${active ? 'bg-dark-950 text-dark-white' : 'bg-dark-white text-dark-950 hover:bg-dark-950 hover:text-dark-white'}`}><Icon size={16} /></button>
}
