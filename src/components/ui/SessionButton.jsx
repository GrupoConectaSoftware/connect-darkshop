export default function SessionButton({
  children,
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = 'primary',
}) {
  const variants = {
    primary: 'bg-dark-white text-dark-950 hover:bg-dark-100',
    outline: 'border border-dark-700 bg-transparent text-dark-white hover:border-dark-400',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex min-h-12 items-center justify-center gap-3 px-5 py-3 font-body text-xs font-semibold uppercase tracking-[0.08em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-white/70 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none ${fullWidth ? 'w-full' : ''} ${variants[variant] ?? variants.primary}`}
    >
      {loading && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
      {children}
    </button>
  )
}
