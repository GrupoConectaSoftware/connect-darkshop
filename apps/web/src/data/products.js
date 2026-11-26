import outletOne from "../assets/Sections/homespages/outlet/products/outletUno.webp";
import outletTwo from "../assets/Sections/homespages/outlet/products/ouletDos.webp";
import outletThree from "../assets/Sections/homespages/outlet/products/outletTres.webp";
import outletFour from "../assets/Sections/homespages/outlet/products/outletCuatro.webp";
import marcoFront from "../assets/Catalog/Marco/model/marcoFrente.webp";
import marcoSide from "../assets/Catalog/Marco/model/marcoLado.webp";
import marcoBack from "../assets/Catalog/Marco/model/marcoEspalda.webp";
import marcoClothesFront from "../assets/Catalog/Marco/clothes/marcoFrente.webp";
import marcoClothesSide from "../assets/Catalog/Marco/clothes/marcoLado.webp";
import marcoClothesBack from "../assets/Catalog/Marco/clothes/marcoEspalda.webp";
import mateoFront from "../assets/Catalog/Mateo/model/mateoFrente.webp";
import mateoSide from "../assets/Catalog/Mateo/model/mateoLado.webp";
import mateoBack from "../assets/Catalog/Mateo/model/mateoEspalda.webp";
import mateoClothesFront from "../assets/Catalog/Mateo/clothes/mateoFrente.webp";
import mateoClothesSide from "../assets/Catalog/Mateo/clothes/mateoLado.webp";
import mateoClothesBack from "../assets/Catalog/Mateo/clothes/mateoEspalda.webp";
import nicolasFront from "../assets/Catalog/Nicolas/model/nicolasFrente.webp";
import nicolasSide from "../assets/Catalog/Nicolas/model/nicolasLado.webp";
import nicolasBack from "../assets/Catalog/Nicolas/model/nicolasEspalda.png";
import nicolasClothesFront from "../assets/Catalog/Nicolas/clothes/nicolasFrente.webp";
import nicolasClothesSide from "../assets/Catalog/Nicolas/clothes/nicolasLado.webp";
import nicolasClothesBack from "../assets/Catalog/Nicolas/clothes/nicolasEspalda.webp";
import sofiaFront from "../assets/Catalog/Sofia/model/sofiaFrente..webp";
import sofiaSide from "../assets/Catalog/Sofia/model/sofiaLado.png";
import sofiaBack from "../assets/Catalog/Sofia/model/sofiaEspalda.png";
import sofiaClothesFront from "../assets/Catalog/Sofia/clothes/sofiaFrente.webp";
import sofiaClothesSide from "../assets/Catalog/Sofia/clothes/sofiaLado.webp";
import sofiaClothesBack from "../assets/Catalog/Sofia/clothes/sofiaEspalda.webp";
import valentinaFront from "../assets/Catalog/Valentina/model/valentinaFrente.webp";
import valentinaSide from "../assets/Catalog/Valentina/model/valentinaLado.webp";
import valentinaBack from "../assets/Catalog/Valentina/model/valentinaEspalda.webp";
import valentinaClothesFront from "../assets/Catalog/Valentina/clothes/valentinaFrente.webp";
import valentinaClothesSide from "../assets/Catalog/Valentina/clothes/valentinaLado.webp";
import valentinaClothesBack from "../assets/Catalog/Valentina/clothes/valentinaEspalda.webp";

export const catalogImageSets = [
  { imagesModel: [marcoFront, marcoSide, marcoBack], imagesClothes: [marcoClothesFront, marcoClothesSide, marcoClothesBack] },
  { imagesModel: [mateoFront, mateoSide, mateoBack], imagesClothes: [mateoClothesFront, mateoClothesSide, mateoClothesBack] },
  { imagesModel: [nicolasFront, nicolasSide, nicolasBack], imagesClothes: [nicolasClothesFront, nicolasClothesSide, nicolasClothesBack] },
  { imagesModel: [sofiaFront, sofiaSide, sofiaBack], imagesClothes: [sofiaClothesFront, sofiaClothesSide, sofiaClothesBack] },
  { imagesModel: [valentinaFront, valentinaSide, valentinaBack], imagesClothes: [valentinaClothesFront, valentinaClothesSide, valentinaClothesBack] },
];

export const badgesData = [
  { variant: "descuento", label: "Descuento" },
  { variant: "nuevo", label: "Nuevo drop" },
  { variant: "obsequio", label: "Obsequio" },
  { variant: "recomendado", label: "Recomendado" },
];

const templates = [
  {
    name: "Hoodie edición aniversario",
    description:
      "Felpa premium, caída amplia y una silueta hecha para todos los días.",
    image: outletOne,
    imagesModel: [outletOne, outletTwo, outletThree],
    imagesGarment: [outletOne, outletThree, outletFour],
    brand: "DARK",
    colors: ["#080808", "#f5f5f3", "#491c25"],
    unavailableSizes: ["XL"],
  },
  {
    name: "Camiseta oversize esencial",
    description: "Algodón suave de alto gramaje con un corte amplio y limpio.",
    image: outletTwo,
    imagesModel: [outletTwo, outletThree, outletFour],
    imagesGarment: [outletTwo, outletFour, outletOne],
    brand: "AMERICAN EAGLE",
    colors: ["#121212", "#1f3653", "#d9d9d9"],
    unavailableSizes: ["XS", "XXL"],
  },
  {
    name: "Camiseta oversize oceánica",
    description:
      "Silueta relajada y acabado azul profundo para un look urbano.",
    image: outletThree,
    imagesModel: [outletThree, outletFour, outletOne],
    imagesGarment: [outletThree, outletOne, outletTwo],
    brand: "MONCLER FRIEND",
    colors: ["#080808", "#333333", "#491c25"],
    unavailableSizes: ["S"],
  },
  {
    name: "Camiseta oversize Medusa",
    description: "Algodón compacto, corte amplio y una actitud que se nota.",
    image: outletFour,
    imagesModel: [outletFour, outletOne, outletTwo],
    imagesGarment: [outletFour, outletTwo, outletThree],
    brand: "DYNAMO BRAND",
    colors: ["#080808", "#737373", "#f5f5f3"],
    unavailableSizes: ["L", "XL"],
  },
];

export const productsData = Array.from({ length: 12 }, (_, index) => {
  const base = templates[index % templates.length];
  const badge = badgesData[index % badgesData.length];
  const price = 30000 + (index % 8) * 2000;
  const originalPrice = index % 4 === 3 ? null : price + 22000;
  return {
    ...base,
    catalogImages: catalogImageSets[index % catalogImageSets.length],
    id: `product-${index + 1}`,
    gender: index % catalogImageSets.length < 3 ? "hombre" : "mujer",
    name: `${base.name} ${String(index + 1).padStart(2, "0")}`,
    brandType: "TIENDA OFICIAL",
    category: index % 4 === 0 ? "chaquetas" : "camisetas",
    price,
    colorPrices: Object.fromEntries(base.colors.map((color, colorIndex) => [color, price + colorIndex * 2000])),
    sizePriceAdjustments: { XS: 0, S: 0, M: 0, L: 0, XL: 2000, XXL: 4000 },
    originalPrice,
    discount: originalPrice
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0,
    badge,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  };
});

export const outletProductsData = productsData;
export const sizesData = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "38",
  "39",
  "40",
  "41",
  "42",
];



export const OUTLET_PRODUCTS_ON_SALE = outletProductsData;
