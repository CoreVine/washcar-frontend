"use client"

import ProductCard from "@/components/common/products/card"

import { useTranslations } from "next-intl"
import { useProducts } from "@/hooks/data/use-products"

import { DEFAULT_USER_IMAGE } from "@/lib/constants"
import { NoDataLabel } from "@/components/common/no-data-label"
import { Skeleton } from "@/components/ui/skeleton"
import { ProductsLoadingState } from "@/components/common/products/loading-state"
import { Fragment } from "react"
import { EmptyProductState } from "@/components/common/products/empty-state"

export default function MarketProductsList() {
  const t = useTranslations()

  const { products, isProductsLoading, isProductsHasError } = useProducts()

  if (isProductsHasError) return "Error fetching products"

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("products")}</p>

      {isProductsLoading ? (
        <ProductsLoadingState number={10} />
      ) : (
        <Fragment>
          {products?.data && products?.data.length === 0 ? (
            <EmptyProductState />
          ) : (
            <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
              {products?.data?.map((product) => (
                <ProductCard key={`product-card-market-${product.product_id}`} id={product.product_id} title={product.product_name} subtitle={product.price} image={product.images?.[0].image_url ?? DEFAULT_USER_IMAGE} />
              ))}
            </section>
          )}
        </Fragment>
      )}
    </div>
  )
}
