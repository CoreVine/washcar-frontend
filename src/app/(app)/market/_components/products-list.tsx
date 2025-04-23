"use client"

import ProductCard from "@/components/common/products/card"

import { useTranslations } from "next-intl"
import { useProducts } from "@/hooks/data/use-products"

import { DEFAULT_USER_IMAGE } from "@/lib/constants"
import { ProductsLoadingState } from "@/components/common/products/loading-state"
import { Fragment } from "react"
import { EmptyProductState } from "@/components/common/products/empty-state"
import { CreateProductModal } from "@/components/common/products/create-modal"
import { TSearchParams } from "@/types/default"

export default function MarketProductsList({ sp }: { sp: TSearchParams }) {
  const t = useTranslations()

  const { products, isProductsLoading, isProductsHasError } = useProducts(sp)

  if (isProductsHasError) return "Error fetching products"

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <div className='flex items-center justify-between'>
        <p className='text-lg'>{t("products")}</p>
        <CreateProductModal />
      </div>

      {isProductsLoading ? (
        <ProductsLoadingState number={10} />
      ) : (
        <Fragment>
          {products?.data && products?.data.length === 0 ? (
            <EmptyProductState />
          ) : (
            <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
              {products?.data?.map((product) => (
                <ProductCard key={`product-card-market-${product.product_id}`} id={product.product_id} title={product.product_name} subtitle={product.price} image={product.images?.[0]?.image_url ?? DEFAULT_USER_IMAGE} />
              ))}
            </section>
          )}
        </Fragment>
      )}
    </div>
  )
}
