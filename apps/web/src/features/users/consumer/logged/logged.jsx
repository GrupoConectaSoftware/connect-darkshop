import NavLayout from "./layouts/navLayout";
import IntroductionSection from "./sections/introductionSection";
import StoresSection from "./sections/storesSection";
import SetSection from "./sections/setSection";
import RankingSection from "./sections/rankingSection";
import Footer from "../homepages/layouts/Footer";
import CategoriesSection from "../homepages/sections/categoriesSection";
import OutletSection from "../homepages/sections/outletSection";
import CtaSection from "../homepages/sections/ctaSection";
import CollectionsButton from "../../../../components/ui/buttons/CollectionsButton";
import { COLLECTIONS } from "../../../../data/collections.js";

export default function Logged() {
  return (
    <div className="min-h-screen bg-white text-dark-950 dark:bg-[#1a1a1d] dark:text-white">
      <NavLayout />
      <main>
        <IntroductionSection />
        <OutletSection />
        <RankingSection />
        <CategoriesSection />
        <StoresSection />
        <CtaSection />
        <SetSection />
      </main>
      <Footer />
      <CollectionsButton count={COLLECTIONS.length} href="/poster" />
    </div>
  );
}
