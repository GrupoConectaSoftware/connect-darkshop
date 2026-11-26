export default function filterByGender(products, gender) {
  if (!gender || gender === 'todo') return products

  return products.filter((product) => {
    const productGender = product.gender?.toLowerCase()
    return productGender === gender || (gender !== 'ninos' && productGender === 'unisex')
  })
}
