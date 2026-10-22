import LoggedSetSection from "../../consumer/logged/sections/setSection";

export default function SetSection() {
  return (
    <div className="bg-white pb-16 sm:pb-20 lg:pb-28">
      <LoggedSetSection
        storeFilter="DARK"
        homeHref="#inicio"
        collectionHref="#conjuntos"
        showCarouselAffordances
      />
    </div>
  );
}
