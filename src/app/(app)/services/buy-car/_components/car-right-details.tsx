"use client"

import { Fragment, useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/data/use-cart"

import { addBuyCarToCart, removeBuyCarFromCart } from "@/actions/cart"
import { toast } from "react-toastify"

import { LoadingButton } from "@/components/common/loading-button"
import { Car } from "@/types/models"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  car: Car
}

export const CarRightDetails = ({ car }: Props) => {
  const t = useTranslations()

  const [isAdded, setIsAdded] = useState(false)

  const { cart, isCartFetched, isCartLoading } = useCart()

  const addMutation = useMutation({
    mutationFn: (carId: number) => addBuyCarToCart(carId, car.company_id),
    onSuccess() {
      toast.success(t("added"))
      setIsAdded(true)
    },
    onError: (e: any) => {
      toast.error(e?.message || "Failed")
    }
  })

  const removeMutation = useMutation({
    mutationFn: (itemId: number) => removeBuyCarFromCart(itemId, car.company_id),
    onSuccess() {
      toast.success(t("removedFromCart"))
      setIsAdded(false)
    },
    onError: (e: any) => {
      toast.error(e?.message || "Failed")
    }
  })

  const handleAddToCart = () => {
    addMutation.mutate(car.car_id)
  }

  const handleRemoveFromCart = () => {
    removeMutation.mutate(Number(cart?.carOrder?.car_order_id))
  }

  useEffect(() => {
    if (cart?.carOrder) setIsAdded(true)
  }, [isCartFetched])

  return (
    <div className='md:w-1/2 p-6'>
      <div className='mb-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-700'>{t("carPrice")}</span>
          <span className='font-medium'>{car.price || 0} KWD</span>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-700'>{t("services")}</span>
          <span className='font-medium'>{car.price || 0} KWD</span>
        </div>
      </div>

      <div className='mb-6 border-t border-dashed border-gray-300 pt-4'>
        <div className='flex items-center justify-between font-medium'>
          <span>{t("total")}</span>
          <span>{car?.price || 0} KWD</span>
        </div>
      </div>

      {isCartLoading ? (
        <Skeleton className='w-full h-14 rounded-full' />
      ) : (
        <Fragment>
          {isAdded ? (
            <LoadingButton loading={removeMutation.isPending} onClick={handleRemoveFromCart} className='w-full h-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-lg'>
              {t("removeFromCart")}
            </LoadingButton>
          ) : (
            <LoadingButton loading={addMutation.isPending} onClick={handleAddToCart} className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
              {t("addToCart")}
            </LoadingButton>
          )}
        </Fragment>
      )}
    </div>
  )
}
