export default function GoogleButton({ children, onClick, loading = false, disabled = false, fullWidth = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex min-h-12 min-w-0 cursor-pointer items-center justify-center gap-3 border border-dark-700 bg-transparent px-5 py-3 font-body text-xs font-medium uppercase tracking-wide text-dark-white transition-colors duration-200 hover:border-dark-400 hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-white/70 disabled:cursor-not-allowed disabled:opacity-50 ${fullWidth ? 'w-full' : ''}`}
    >
      {loading ? (
        <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
      ) : (
        <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5 shrink-0">
          <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z" />
          <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z" />
          <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z" />
          <path fill="#EA4335" d="M24 12c3 0 5.7 1 7.8 3l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.6 18.7 12 24 12Z" />
        </svg>
      )}
      {children}
    </button>
  )
}
