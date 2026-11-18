import { useEffect, useState } from "react";
import CheckoutLayout from "./components/CheckoutLayout";
import CheckoutTimeline from "./components/CheckoutTimeline";
import PaymentFormCard from "./components/PaymentFormCard";
import PaymentProcessing from "./components/PaymentProcessing";
import PaymentResult from "./components/PaymentResult";
import { dismissToast, showToast } from "../../../../utils/toast";

export default function CheckoutPage() {
  const [step, setStep] = useState("form");
  const [paymentToastId, setPaymentToastId] = useState(null);
  useEffect(() => {
    if (step !== "processing") return undefined;
    const timer = window.setTimeout(() => {
      dismissToast(paymentToastId);
      showToast("success", "Compra de prueba confirmada en esta vista.");
      setStep("success");
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [step, paymentToastId]);
  return (
    <CheckoutLayout>
      {step === "form" && (
        <PaymentFormCard
          onPay={(toastId) => {
            setPaymentToastId(toastId);
            setStep("processing");
          }}
        />
      )}{" "}
      {step === "processing" && <PaymentProcessing />}{" "}
      {(step === "success" || step === "error") && (
        <PaymentResult status={step} onRetry={() => setStep("form")} />
      )}
      <CheckoutTimeline stage={step} />
    </CheckoutLayout>
  );
}
