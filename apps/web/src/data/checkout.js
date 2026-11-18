import mastercard from "../assets/payments/mastercard-logo.svg";
import pse from "../assets/payments/pse-official.png";
import nequi from "../assets/payments/nequi-2.svg";
import bancolombia from "../assets/payments/bancolombia.svg";
export const paymentMethodsData = [
  { id: "card", label: "Mastercard", logo: mastercard },
  { id: "pse", label: "PSE", logo: pse },
  { id: "nequi", label: "Nequi", logo: nequi },
  { id: "bancolombia", label: "Bancolombia", logo: bancolombia },
];

export const checkoutStepsData = [
  "Pago recibido",
  "Verificando pago",
  "Confirmaci\u00f3n",
];

export const checkoutSteps = checkoutStepsData;
