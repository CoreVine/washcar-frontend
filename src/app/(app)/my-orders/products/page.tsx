import { ProductOrderDetails } from "../_components/products/single-order"
import { MyOrdersPageHeader } from "../_components/header"

export default function MyProductsOrder() {
  const products = Array(10).fill({
    title: "Rewash car",
    price: "50KWD",
    image: "/defaults/products/01.png"
  })

  return (
    <div>
      <MyOrdersPageHeader title='products' />

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {products.map((product, index) => (
          <ProductOrderDetails key={index} product={product} />
        ))}
      </div>
    </div>
  )
}
