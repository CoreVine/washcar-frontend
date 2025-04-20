"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/data/use-cart"

import { useTranslations } from "next-intl"
import { CartRightSideLoadingState } from "./loading-state"

export default function CartDetailsRightSide() {
  const t = useTranslations()

  const { cart, isCartLoading } = useCart()

  const totalServices = cart?.carWashOrder?.washTypes?.reduce((sum, item) => sum + (item.price || 0), 0) || 0
  const totalProducts = cart?.orderItems?.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0) || 0

  let rentalPrice = 0
  let rentalDays = 0

  const startDate = cart?.rentalOrder?.start_date
  const endDate = cart?.rentalOrder?.end_date
  const pricePerDay = Number(cart?.rentalOrder?.car?.price) || 0

  if (startDate && endDate) {
    const start = new Date(startDate)
    const end = new Date(endDate)

    const diffTime = end.getTime() - start.getTime()
    rentalDays = Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1)
    rentalPrice = rentalDays * pricePerDay
  }

  const totalBeforeRental = totalServices + totalProducts
  const total = totalBeforeRental + rentalPrice
  const totalServicesWithRental = totalServices + rentalPrice

  if (isCartLoading) return <CartRightSideLoadingState />

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("products")}</p>
          <p className='font-medium'>{totalServices.toFixed(2)}KWD</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("services")}</p>
          <p className='font-medium'>{totalServicesWithRental.toFixed(2)}KWD</p>
        </div>

        <div className='border-t border-dashed border-t-main-gray pt-4'></div>

        <div className='flex justify-between items-center'>
          <p className='font-medium'>{t("total")}</p>
          <p className='font-medium'>{total.toFixed(2)}KWD</p>
        </div>
      </div>

      {total > 0 ? (
        <Button className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>{t("checkout")}</Button>
      ) : (
        <div className='border p-2 rounded-md text-sm px-4 font-medium'>
          {t("pleaseAddItemsToCart")}.{" "}
          <Link href='/market' className='text-blue-500 hover:underline'>
            {t("keepShopping")}
          </Link>
        </div>
      )}
    </div>
  )
}
