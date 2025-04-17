"use client"

import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { Fragment, useEffect, useState } from "react"
import { useCart } from "@/hooks/data/use-cart"
import { useUser } from "@/hooks/auth/use-user"
import { useRouter } from "next/navigation"

import { addCarWashItemsToCart, emptyCarWashItemsFromCart } from "@/actions/cart"
import { toast } from "react-toastify"

import { WashCarTypeCartItem, useWashCarCartStore } from "@/store/features/cart/wash-car"
import { SingleCarWashType } from "./single-wash-car-type"
import { CarWashSwitcher } from "./wash-types-switcher"
import { LoadingButton } from "@/components/common/loading-button"
import { LoginAlert } from "@/components/common/login-alert"
import { Company } from "@/types/models"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  company: Company
}

type TMut = {
  companyId: number
  location: string
  items: WashCarTypeCartItem[]
}

export const CompanyRightDetails = ({ company }: Props) => {
  const user = useUser()
  const t = useTranslations()

  const { addCarWash, removeCarWash, emptyCarWash, types } = useWashCarCartStore()
  const { cart, isCartFetched, isCartLoading } = useCart()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAdded, setIsAdded] = useState(false)

  const washTypes = company.wash_types || []
  const selectedWashType = washTypes[currentIndex]

  const mutation = useMutation({
    mutationFn: (data: TMut) => addCarWashItemsToCart(data.companyId, data.location, data.items),
    onSuccess: () => {
      toast.success(t("addedToCart"))
      setIsAdded(true)
      emptyCarWash()
    },
    onError: (error: any) => {
      toast.error(error?.message || "failed")
    }
  })

  const emptyCartMutation = useMutation({
    mutationFn: (washOrderId: number) => emptyCarWashItemsFromCart(washOrderId),
    onSuccess: () => {
      toast.success(t("removedFromCart"))
      setIsAdded(false)
    },
    onError: (error: any) => {
      toast.error(error?.message || "failed")
    }
  })

  const handleAddToServices = () => {
    if (!selectedWashType) return
    const added = types.find((s) => s.typeId === selectedWashType.type_id)
    if (added) {
      toast.error(t("alreadyAdded"))
      return
    }
    addCarWash({
      typeId: selectedWashType.type_id,
      companyId: company.company_id,
      name: selectedWashType.name,
      quantity: 1,
      totalPrice: Number(selectedWashType.price),
      unitPrice: Number(selectedWashType.price)
    })
  }

  const handleRemoveFromServices = (id: number) => {
    removeCarWash(id)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < washTypes.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleAddToCart = () => {
    mutation.mutate({
      location: company.location,
      companyId: company.company_id,
      items: types
    })
  }

  useEffect(() => {
    setIsAdded(!!cart?.carWashOrder)
  }, [isCartFetched])

  const total = types.reduce((total, s) => total + Number(s.totalPrice), 0)

  if (!washTypes.length || washTypes.length === 0) return <div className='p-6'>{t("noWashTypesAvailable")}</div>

  return (
    <div className='p-6 md:w-1/2'>
      <div className='mb-6 flex items-center justify-between'>
        <CarWashSwitcher handlePrev={handlePrev} handleNext={handleNext} currentIndex={currentIndex} selectedWashType={selectedWashType} washTypesLength={washTypes.length} />

        <div className='flex items-center gap-6'>
          <span className='font-medium'>{selectedWashType?.price} KWD</span>
        </div>

        <div className='flex items-center gap-6'>
          <button onClick={handleAddToServices} className='rounded-3xl text-sm cursor-pointer px-4 py-2 bg-main-gray hover:bg-gray-100'>
            {t("add")}
          </button>
        </div>
      </div>

      {types.length > 0 ? (
        <div className='mb-6 space-y-4'>
          {types.map((service) => (
            <SingleCarWashType handleRemoveFromServices={handleRemoveFromServices} service={service} key={`service-item-${service.typeId}`} />
          ))}
        </div>
      ) : (
        <div className='mb-6 space-y-4 text-center text-lg text-gray-500'>{t("noServiceAvailable")}</div>
      )}

      <div className='mb-6 border-t border-dashed border-gray-300 pt-4'>
        <div className='flex items-center justify-between font-medium'>
          <span>{t("total")}</span>
          <span>{total} KWD</span>
        </div>
      </div>

      {isCartLoading ? (
        <Skeleton className='w-full rounded-full h-14' />
      ) : (
        <div>
          {user?.user_id ? (
            <Fragment>
              {isAdded ? (
                <LoadingButton loading={emptyCartMutation.isPending} onClick={() => emptyCartMutation.mutate(Number(cart?.carWashOrder?.wash_order_id))} className='w-full rounded-full bg-red-500 py-3 font-medium text-white hover:bg-red-600'>
                  {t("emptyCart")}
                </LoadingButton>
              ) : (
                <LoadingButton loading={mutation.isPending} onClick={handleAddToCart} disabled={total == 0} className='w-full rounded-full bg-blue-500 py-3 font-medium text-white hover:bg-blue-600'>
                  {t("addToCart")}
                </LoadingButton>
              )}
            </Fragment>
          ) : (
            <LoginAlert />
          )}
        </div>
      )}
    </div>
  )
}
