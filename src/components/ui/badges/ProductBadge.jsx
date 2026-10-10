export default function ProductBadge({ label }) {
  if (!label) return null;

  return (
    <span className="inline-flex -rotate-2 bg-dark-burgundy px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-dark-white">
      {label}
    </span>
  );
}
