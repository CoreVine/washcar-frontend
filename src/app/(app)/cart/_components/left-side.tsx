"use client"

import Image from "next/image"

import { ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCart } from "@/hooks/data/use-cart"
import { ServiceItem } from "./service-item"
import { ProductItem } from "./product-item"
import { Separator } from "@/components/ui/separator"
import { RentCarItem } from "./rent-car-item"
import { Skeleton } from "@/components/ui/skeleton"
import { BuyCarItem } from "./buy-car-item"
import { Fragment } from "react"

export default function CartDetailsLeftSide() {
  const t = useTranslations()

  const { cart, isCartLoading } = useCart()

  console.log("Cart", cart)

  if (isCartLoading) return <LoadingState />

  return (
    <div className='xl:w-1/2 border-r px-6 space-y-6'>
      <div className='grid xl:grid-cols-2'>
        <div>
          <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
            <ChevronLeft className='h-5 w-5 text-gray-600' />
          </button>
        </div>
        <h1 className='font-semibold text-lg'>{t("cart")}</h1>
      </div>

      <section className='space-y-4 divide-y'>
        {cart?.orderItems && cart?.orderItems?.length > 0 && (
          <Fragment>
            {cart?.orderItems && (
              <div className='space-y-4'>
                <p className='text-xl font-medium'>{t("products")}</p>
                <div className='divide-y'>
                  {cart.orderItems.map((item) => (
                    <ProductItem initialQty={item.quantity} itemId={item.order_item_id} key={`product-item-${item.product_id}`} product={item.product} />
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )}

        {cart?.carWashOrder && cart.carWashOrder.washTypes.length > 0 && (
          <Fragment>
            {cart?.carWashOrder && (
              <div className='space-y-4'>
                <p className='text-xl font-medium'>{t("washTypes")}</p>
                <div className='divide-y'>
                  {cart?.carWashOrder?.washTypes?.map((service) => (
                    <ServiceItem key={`service-item-${service.type_id}`} service={service} />
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )}

        {cart?.rentalOrder && (
          <div>
            <p className='text-xl font-medium'>{t("rentingCar")}</p>
            <RentCarItem car={cart.rentalOrder.car} rentOrderId={cart.rentalOrder.rental_order_id} />
          </div>
        )}
        {cart?.carOrder && (
          <div>
            <p className='text-xl font-medium'>{t("buyingCar")}</p>
            <BuyCarItem car={cart.carOrder.car} />
          </div>
        )}
      </section>
    </div>
  )
}

const LoadingState = () => {
  return (
    <div className='xl:w-1/2 border-r px-6 space-y-6'>
      <div className='grid xl:grid-cols-2'>
        <div>
          <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
            <ChevronLeft className='h-5 w-5 text-gray-600' />
          </button>
        </div>
        <Skeleton className='w-50 h-6' />
      </div>

      <section className='space-y-4'>
        {Array.from({ length: 5 }).map((i, idx) => (
          <div className='space-y-2' key={`loading-item-${idx}`}>
            <Skeleton className='w-65 h-4' />
            <div className='flex items-center gap-4'>
              <Skeleton className='size-20' />
              <div className='w-full flex justify-between'>
                <Skeleton className='w-40 h-4' />
                <Skeleton className='w-20 h-4 mt-2' />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
