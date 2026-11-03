import collectionImage from "../../../../../assets/Collection/imagesCollection.webp";

export default function BannerSection() {
  return (
    <section
      aria-label="Presentación de colecciones"
      className="relative h-100 w-full overflow-hidden lg:h-200"
    >
      <img
        src={collectionImage}
        alt="Colecciones DARK"
        className="absolute inset-0 size-full object-cover"
      />
    </section>
  );
}
