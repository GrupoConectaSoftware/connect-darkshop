import OnboardingSection, { continueClass } from '../components/OnboardingSection'

export default function WelcomeSection({ onNext, onLogout }) {
  return (
    <OnboardingSection activeStep={1} eyebrow="Paso 01 de 06" title="Bienvenido" subtitle="" onLogout={onLogout}>
      <div className="space-y-5 text-sm leading-7 text-neutral-400 sm:text-base">
        <p>Estás a punto de ser parte del ecosistema de DarkShop.</p>
        <p>Aquí encontrarás una gran variedad de marcas, colecciones y estilos en un solo lugar, con una experiencia de compra segura, rápida y diseñada para ti.</p>
        <p>Solo necesitas completar unos pasos para configurar tu cuenta y empezar a explorar todo lo que tenemos para ofrecerte.</p>
      </div>
      <button type="button" onClick={onNext} className={continueClass}>Continuar con la configuración principal</button>
    </OnboardingSection>
  )
}
