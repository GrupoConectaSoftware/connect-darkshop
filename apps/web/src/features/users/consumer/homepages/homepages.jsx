import { useCallback, useState } from 'react'
import VideoIntro from './sections/VideoIntro'
import NavLayout from './layouts/navLayout'
import NewsletterSection from './sections/NewsletterSection'
import Footer from './layouts/Footer'
import IntroductionSection from './sections/introductionSection'
import OutletSection from './sections/outletSection'
import CommunitySection from './sections/communitySection'
import CategoriesSection from './sections/categoriesSection'
import AdvantagesSection from './sections/adventagesSection'
import SetSection from './sections/setSection'
import CtaSection from './sections/ctaSection'
import GenderComponents from './components/GenderComponents'
import useGender from '../../../../hooks/useGender'
import CollectionsButton from '../../../../components/ui/buttons/CollectionsButton'
import { COLLECTIONS } from '../../../../data/collections.js'

export default function Homepages() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const { gender } = useGender()
  const [showIntro, setShowIntro] = useState(() => {
    try { return !sessionStorage.getItem('introPlayed') } catch { return true }
  })
  const finishIntro = useCallback(() => setShowIntro(false), [])

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand)
    document.getElementById('coleccion')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      {showIntro && <VideoIntro onFinish={finishIntro} />}
      <div className="flex min-h-screen flex-col bg-dark-950 text-dark-50" aria-hidden={gender ? undefined : true} inert={gender ? undefined : ''}>
        <NavLayout />
        <main id="inicio" className="flex-1">
          <IntroductionSection />
          <OutletSection selectedBrand={selectedBrand} gender={gender} />
          <CommunitySection />
          <CategoriesSection />
          <AdvantagesSection />
          <SetSection selectedBrand={selectedBrand} onBrandSelect={handleBrandSelect} />
          <CtaSection />
        </main>

        <div aria-hidden="true" className="h-10 bg-white sm:h-16 lg:h-24 dark:bg-[#1a1a1d]" />
        <NewsletterSection />
        <div aria-hidden="true" className="h-10 bg-white sm:h-16 lg:h-24 dark:bg-[#1a1a1d]" />
        <Footer />
      </div>
      {!gender && <GenderComponents />}
      {gender && <CollectionsButton count={COLLECTIONS.length} href="/poster" />}
    </>
  )
}
