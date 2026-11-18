export default function ProductSkeleton() {
  return (
    <div
      aria-label="Cargando producto"
      className="animate-pulse overflow-hidden border border-neutral-200 bg-white"
    >
      <div className="aspect-[3/4] bg-neutral-200" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 bg-neutral-200" />
        <div className="h-3 w-full bg-neutral-100" />
        <div className="h-4 w-1/3 bg-neutral-200" />
      </div>
    </div>
  );
}
