import bannerImage from "../../../../assets/Brand/banner/bannerSection.webp";
import Reveal from '../../../../components/ux/Reveal'

export default function BannerSection() {
  return (
    <Reveal as="section" effect="clip" aria-label="Banner de presentación de Dark">
      <img
        src={bannerImage}
        alt="Piezas que definen tu estilo: selección de prendas Dark"
        className="block h-auto w-full"
      />
    </Reveal>
  );
}
