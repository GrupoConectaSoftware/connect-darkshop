export default function IconActionButton({ icon: Icon, label, onClick, className = '', iconClassName = '', hoverColorOnly = false }) {
  const hoverStyle = hoverColorOnly ? 'hover:bg-dark-950 hover:text-dark-red' : 'hover:bg-dark-red'
  return <button type="button" aria-label={label} onClick={onClick} className={`grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-dark-950 text-dark-white transition-colors ${hoverStyle} ${className}`}><Icon size={15} className={iconClassName} /></button>
}
