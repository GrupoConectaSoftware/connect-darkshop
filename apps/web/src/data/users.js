import profileImage from "../assets/Profile/imagesProfile.webp";
export const userProfile = {
  id: "alejandro-aguilon",
  name: "Alejandro Aguilón Buitrago",
  email: "alejandro@correo.com",
  phone: "300 123 4567",
  city: "Cali, Colombia",
  image: profileImage,
};

import { productsData } from "./products";
const pickImages = (indexes) =>
  indexes.map((index) => productsData[index]?.image).filter(Boolean);
export const userOrders = [
  {
    id: "#DS-00241",
    date: "12 oct. 2026",
    delivery: "16 oct. 2026",
    status: "En camino",
    total: 189900,
    images: pickImages([0, 1, 2, 3]),
    guide: "CDR-884592301",
    carrier: "Coordinadora",
    address: "Cra. 80 # 44-32, Cali, Colombia",
  },
  {
    id: "#DS-00217",
    date: "28 sep. 2026",
    delivery: "02 oct. 2026",
    status: "Entregados",
    total: 329800,
    images: pickImages([0, 1, 2]),
    guide: "CDR-884592302",
    carrier: "Coordinadora",
    address: "Cra. 80 # 44-32, Cali, Colombia",
  },
  {
    id: "#DS-00193",
    date: "15 sep. 2026",
    delivery: "18 sep. 2026",
    status: "En preparación",
    total: 179950,
    images: pickImages([1, 2]),
    guide: "CDR-884592303",
    carrier: "Coordinadora",
    address: "Cra. 80 # 44-32, Cali, Colombia",
  },
  {
    id: "#DS-00176",
    date: "03 sep. 2026",
    delivery: "05 sep. 2026",
    status: "Cancelados",
    total: 245600,
    images: pickImages([0, 1, 2]),
    guide: "CDR-884592304",
    carrier: "Coordinadora",
    address: "Cra. 80 # 44-32, Cali, Colombia",
  },
  {
    id: "#DS-00158",
    date: "22 ago. 2026",
    delivery: "27 ago. 2026",
    status: "Entregados",
    total: 167300,
    images: pickImages([1, 2, 3]),
    guide: "CDR-884592305",
    carrier: "Coordinadora",
    address: "Cra. 80 # 44-32, Cali, Colombia",
  },
];

export const userPurchases = userOrders.map((order) => ({
  ...order,
  status:
    order.status === "Entregados"
      ? "Entregada"
      : order.status === "Cancelados"
        ? "Cancelada"
        : order.status === "En preparación"
          ? "Procesando"
          : order.status,
}));

export const userPaymentMethods = [
  { id: "nequi", name: "Nequi", account: "Cuenta **** 3021", default: true },
  {
    id: "bancolombia",
    name: "Bancolombia",
    account: "Cuenta de ahorros **** 7710",
    default: false,
  },
];

export const userFavorites = productsData.slice(0, 4);

export const preferencesOptionsData = {
  styles: [
    { id: "urban", label: "Urbano" },
    { id: "elegant", label: "Elegante" },
    { id: "sport", label: "Deportivo" },
    { id: "oversize", label: "Oversize" },
    { id: "minimalist", label: "Minimalista" },
    { id: "techwear", label: "Techwear" },
  ],
  dashboardGarments: [
    { id: "camisetas", label: "Camisetas" },
    { id: "polos", label: "Polos" },
    { id: "sudaderas", label: "Sudaderas" },
    { id: "chaquetas", label: "Chaquetas" },
    { id: "pantalones", label: "Pantalones" },
    { id: "jeans", label: "Jeans" },
    { id: "zapatos", label: "Zapatos" },
    { id: "accesorios", label: "Accesorios" },
    { id: "lociones", label: "Lociones" },
  ],
  onboardingCategories: [
    { id: "shirts", label: "Camisetas" },
    { id: "pants", label: "Pantalones" },
    { id: "shorts", label: "Shorts" },
    { id: "jackets", label: "Chaquetas" },
    { id: "socks", label: "Medias" },
    { id: "glasses", label: "Gafas" },
    { id: "shoes", label: "Zapatos" },
  ],
  colors: [
    { id: "black", label: "Negro", colorClass: "bg-neutral-950" },
    { id: "gray", label: "Gris", colorClass: "bg-neutral-500" },
    { id: "white", label: "Blanco", colorClass: "bg-white" },
    { id: "wine", label: "Rojo vino", colorClass: "bg-[#721a2a]" },
    { id: "beige", label: "Beige", colorClass: "bg-[#d8c6aa]" },
  ],
  brands: [
    { id: "dark", label: "DARK" },
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "new-balance", label: "New Balance" },
    { id: "jordan", label: "Jordan" },
    { id: "converse", label: "Converse" },
  ],
};

export const preferenceSizeGroups = [
  { id: "camisetas", name: "Camisetas", options: ["XS", "S", "M", "L", "XL"] },
  {
    id: "pantalones",
    name: "Pantalones",
    options: ["28", "30", "32", "34", "36"],
  },
  { id: "zapatos", name: "Calzado", options: ["38", "39", "40", "41", "42"] },
  { id: "chaquetas", name: "Chaquetas", options: ["XS", "S", "M", "L", "XL"] },
  { id: "polos", name: "Polos", options: ["XS", "S", "M", "L", "XL"] },
  { id: "sudaderas", name: "Sudaderas", options: ["S", "M", "L", "XL", "XXL"] },
  { id: "jeans", name: "Jeans", options: ["28", "30", "32", "34", "36"] },
];

export const preferencesBenefitsData = [
  {
    icon: "sparkles",
    title: "Descubre más rápido",
    text: "Te mostramos primero los productos que realmente te interesan.",
  },
  {
    icon: "tag",
    title: "Recomendaciones precisas",
    text: "Una experiencia relevante según tus gustos.",
  },
  {
    icon: "gift",
    title: "Novedades que te gustan",
    text: "Recibe lanzamientos y promociones de tus estilos favoritos.",
  },
  {
    icon: "clock",
    title: "Ahorra tiempo",
    text: "Encuentra tus favoritos sin empezar desde cero.",
  },
  {
    icon: "shield",
    title: "Compra más segura",
    text: "Tus decisiones se basan en información más útil.",
  },
  {
    icon: "headphones",
    title: "Soporte prioritario",
    text: "Recibe ayuda contextual cuando la necesites.",
  },
];

export const preferenceToggleData = [
  {
    id: "recommendations",
    title: "Recomendaciones personalizadas",
    text: "Novedades, descuentos y colecciones según tus preferencias.",
  },
  {
    id: "email",
    title: "Promociones por correo",
    text: "Ofertas exclusivas de tus estilos y marcas favoritas.",
  },
  { id: "modelPreview", title: "Ver fotos de modelo por defecto", text: "Elige cómo prefieres visualizar las prendas." },
];

export const dashboardNotifications = [
  "Tu pedido PED-001 ha sido despachado con éxito",
  "Nueva colección de Dark disponible",
  "Tu cupón de descuento vence pronto",
  "Hay nuevas prendas en tus favoritos",
  "Tu pedido PED-002 está en preparación",
  "Descubre las últimas novedades de DarkShop",
  "Una prenda de tu lista vuelve a estar disponible",
];

export const userPreferences = {
  options: preferencesOptionsData,
  sizes: preferenceSizeGroups,
  benefits: preferencesBenefitsData,
  toggles: preferenceToggleData,
};
