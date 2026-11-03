export default function ProductBadge({ label, variant }) {
  if (!label) return null;

  return (
    <span className={`inline-flex -rotate-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-dark-white ${variant === 'recommended' ? 'bg-dark-950' : 'bg-dark-burgundy'}`}>
      {label}
    </span>
  );
}
