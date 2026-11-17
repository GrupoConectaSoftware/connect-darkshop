import { useEffect, useState } from 'react'
import CheckoutLayout from './components/CheckoutLayout'
import CheckoutTimeline from './components/CheckoutTimeline'
import PaymentFormCard from './components/PaymentFormCard'
import PaymentProcessing from './components/PaymentProcessing'
import PaymentResult from './components/PaymentResult'

export default function CheckoutPage() {
  const [step, setStep] = useState('form')
  useEffect(() => { if (step !== 'processing') return undefined; const timer = window.setTimeout(() => setStep('success'), 3000); return () => window.clearTimeout(timer) }, [step])
  return <CheckoutLayout>{step === 'form' && <PaymentFormCard onPay={() => setStep('processing')}/>} {step === 'processing' && <PaymentProcessing/>} {(step === 'success' || step === 'error') && <PaymentResult status={step} onRetry={() => setStep('form')}/>}<CheckoutTimeline stage={step}/></CheckoutLayout>
}
