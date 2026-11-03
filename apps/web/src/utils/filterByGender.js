export default function filterByGender(products, gender) {
  if (!gender || gender === 'todo') return products

  return products.filter((product) => product.gender === gender || product.gender === 'unisex')
}
