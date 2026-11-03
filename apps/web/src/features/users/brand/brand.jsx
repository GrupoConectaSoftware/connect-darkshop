import NavLayout from "./layouts/navLayout";
import IntroductionSection from "./sections/introductionSection";
import BannerSection from "./sections/bannerSection";
import DynamicCategoriesSection from "./sections/dynamicCategoriesSection";
import ReferencesSection from "./sections/referencesSection";
import RecomendadedSection from "./sections/recomendadedSection";
import StudioSection from "./sections/studioSection";
import GallerySection from "./sections/gallerySection";
import CtaSection from "./sections/ctaSection";
import Footer from "../consumer/homepages/layouts/Footer";
import SetSection from "../consumer/logged/sections/setSection";

const BRAND_FOOTER_LINKS = [
  ["Inicio", "#inicio"],
  ["Recomendados", "#recomendados"],
  ["Categorías", "#categorias"],
  ["Conjuntos", "#conjuntos"],
  ["Galería", "#galeria"],
];

export default function Brand() {
  return (
    <div className="min-h-screen bg-white text-dark-950">
      <NavLayout />
      <main>
        <IntroductionSection />
        <BannerSection />
        <RecomendadedSection />

        <StudioSection />
        <DynamicCategoriesSection />

        <ReferencesSection />
        <SetSection
          storeFilter="DARK"
          homeHref="#inicio"
          collectionHref="#conjuntos"
        />
        <CtaSection />
        <GallerySection />
      </main>
      <Footer storeLinks={BRAND_FOOTER_LINKS} />
    </div>
  );
}
