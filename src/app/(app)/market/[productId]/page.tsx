import { getProduct } from "@/actions/products"
import { notFound } from "next/navigation"

import ProductDetailsLeftSide from "../_components/details/left-side"
import ProductDetailsRightSide from "../_components/details/right-side"

type Props = {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductDetailsPage({ params }: Props) {
  const { productId } = await params
  const product = await getProduct(+productId)

  if (!product) return notFound()

  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row'>
      <ProductDetailsLeftSide product={product} />
      <ProductDetailsRightSide product={product} />
    </div>
  )
}
