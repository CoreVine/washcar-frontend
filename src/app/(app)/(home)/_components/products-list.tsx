"use client"

import { useTranslations } from "next-intl"

import ProductCard from "@/components/common/products/card"

import { DEFAULT_USER_IMAGE } from "@/lib/constants"

import { Product } from "@/types/models"
import { EmptyProductState } from "@/components/common/products/empty-state"
import { CreateProductModal } from "@/components/common/products/create-modal"

export default function HomeProductsList({ products }: { products: Product[] }) {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <div className='flex justify-between items-center'>
        <p className='text-lg'>{t("products")}</p>
        <CreateProductModal />
      </div>

      {products?.length === 0 ? (
        <EmptyProductState />
      ) : (
        <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
          {products?.map((product) => (
            <ProductCard key={`product-card-${product.product_id}`} id={product.product_id} title={product.product_name} subtitle={product.price} image={product.images?.[0].image_url ?? DEFAULT_USER_IMAGE} />
          ))}
        </section>
      )}
    </div>
  )
}
