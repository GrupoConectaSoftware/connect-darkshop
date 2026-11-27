export default function PrimaryButton({ children, className = '', ...props }) {
  return <button {...props} className={`flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 font-bold text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 ${className}`}>{children}</button>
}
