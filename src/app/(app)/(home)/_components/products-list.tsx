"use client"

import { NoDataLabel } from "@/components/common/no-data-label"
import ProductCard from "@/components/common/products/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useProducts } from "@/hooks/data/use-products"
import { DEFAULT_USER_IMAGE } from "@/lib/constants"
import { useTranslations } from "next-intl"

export default function HomeProductsList() {
  const t = useTranslations()

  const { products, isProductsLoading, isProductsHasError } = useProducts()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("products")}</p>
      <LoadingState loading={isProductsLoading} />

      {products?.data && products?.data.length === 0 ? (
        <NoDataLabel />
      ) : (
        <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
          {products?.data?.map((product) => (
            <ProductCard key={`product-card-${product.product_id}`} id={product.product_id} title={product.product_name} subtitle={product.price} image={product.images?.[0].image_url ?? DEFAULT_USER_IMAGE} />
          ))}
        </section>
      )}
    </div>
  )
}

const LoadingState = ({ loading }: { loading: boolean }) => {
  if (!loading) return null

  return (
    <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={`loading-card-product-${index}`} className='w-full h-52 rounded-md' />
      ))}
    </section>
  )
}
