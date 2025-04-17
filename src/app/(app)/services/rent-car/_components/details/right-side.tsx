"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useCart } from "@/hooks/data/use-cart"
import { addRentCarToCart, removeRentCarFromCart } from "@/actions/cart"
import { extractInfoFromDate } from "@/lib/utils"
import { toast } from "react-toastify"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingButton } from "@/components/common/loading-button"
import { ArrowRight } from "lucide-react"
import { Car } from "@/types/models"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
  car: Car
}

export default function RentCarDetailsRightSide({ car }: Props) {
  const t = useTranslations()
  const currentYear = new Date().getFullYear().toString()
  const monthsOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))

  const { cart, isCartFetched, isCartLoading } = useCart()

  const rentalOrder = cart?.rentalOrder

  const extractedFrom = extractInfoFromDate(rentalOrder?.start_date || "")
  const extractedTo = extractInfoFromDate(rentalOrder?.end_date || "")

  const [isAdded, setIsAdded] = useState(false)
  const [dayFrom, setDayFrom] = useState(extractedFrom?.day || "")
  const [monthFrom, setMonthFrom] = useState(extractedFrom?.month || "")
  const [dayTo, setDayTo] = useState(extractedTo?.day || "")
  const [monthTo, setMonthTo] = useState(extractedTo?.month || "")

  const rentalDays = useMemo(() => {
    if (dayFrom && monthFrom && dayTo && monthTo) {
      const from = new Date(`${currentYear}-${monthFrom}-${dayFrom}`)
      const to = new Date(`${currentYear}-${monthTo}-${dayTo}`)
      const diff = to.getTime() - from.getTime()
      const days = diff / (1000 * 60 * 60 * 24)
      return days >= 1 ? days : 1
    }
    return 1
  }, [dayFrom, monthFrom, dayTo, monthTo, currentYear])

  const total = useMemo(() => rentalDays * Number(car.price), [rentalDays, car.price])

  const addMutation = useMutation({
    mutationFn: ({ startDate, endDate }: { startDate: string; endDate: string }) => addRentCarToCart(car.car_id, car.company_id, startDate, endDate),
    onSuccess: () => {
      toast.success(t("addedToCart"))
      setIsAdded(true)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("somethingWentWrong"))
    }
  })

  const removeMutation = useMutation({
    mutationFn: () => removeRentCarFromCart(Number(rentalOrder?.rental_order_id), car.company_id),
    onSuccess: () => {
      toast.success(t("removedFromCart"))
      setIsAdded(false)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || t("somethingWentWrong"))
    }
  })

  const handleAddToCart = () => {
    if (!dayFrom || !monthFrom || !dayTo || !monthTo || rentalDays <= 0) {
      toast.error(t("invalidDates"))
      return
    }

    addMutation.mutate({
      startDate: `${currentYear}-${monthFrom}-${dayFrom}`,
      endDate: `${currentYear}-${monthTo}-${dayTo}`
    })
  }

  const handleRemoveFromCart = () => {
    if (rentalOrder?.rental_order_id) {
      removeMutation.mutate()
    }
  }

  useEffect(() => {
    if (rentalOrder?.car_id === car.car_id) {
      setDayFrom(extractedFrom?.day || "")
      setMonthFrom(extractedFrom?.month || "")
      setDayTo(extractedTo?.day || "")
      setMonthTo(extractedTo?.month || "")
    }
    if (cart?.rentalOrder) setIsAdded(true)
  }, [isCartFetched, rentalOrder?.car_id, car.car_id])

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex xl:flex-row flex-col xl:items-center gap-4'>
            {/* Date From */}
            {isCartLoading ? (
              <div className='space-y-2'>
                <Skeleton className='w-12 h-4' />
                <Skeleton className='w-56 h-12' />
              </div>
            ) : (
              <section>
                <p className='text-gray-600'>{t("dateFrom")}</p>
                <div className='flex'>
                  <input min={1} max={31} type='number' value={dayFrom} onChange={(e) => setDayFrom(e.target.value)} placeholder='DD' className='w-16 h-12 bg-gray-100 rounded-l-lg text-center' />
                  <Select value={monthFrom} onValueChange={setMonthFrom}>
                    <SelectTrigger className='w-20 min-h-12 border-0 bg-gray-100 rounded-none'>
                      <SelectValue placeholder={t("month")} />
                    </SelectTrigger>
                    <SelectContent>
                      {monthsOptions.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type='text' value={currentYear} disabled placeholder='YYYY' className='w-20 h-12 bg-gray-100 rounded-r-lg text-center' />
                </div>
              </section>
            )}

            <ArrowRight className='h-5 w-5 mt-5 text-gray-400 mx-2 hidden xl:block' />

            {/* Date To */}
            {isCartLoading ? (
              <div className='space-y-2'>
                <Skeleton className='w-12 h-4' />
                <Skeleton className='w-56 h-12' />
              </div>
            ) : (
              <section>
                <p className='text-gray-600'>{t("dateTo")}</p>
                <div className='flex'>
                  <input min={1} max={31} type='number' value={dayTo} onChange={(e) => setDayTo(e.target.value)} placeholder='DD' className='w-16 h-12 bg-gray-100 rounded-l-lg text-center' />
                  <Select value={monthTo} onValueChange={setMonthTo}>
                    <SelectTrigger className='w-20 min-h-12 border-0 bg-gray-100 rounded-none'>
                      <SelectValue placeholder={t("month")} />
                    </SelectTrigger>
                    <SelectContent>
                      {monthsOptions.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <input type='text' value={currentYear} disabled placeholder='YYYY' className='w-20 h-12 bg-gray-100 rounded-r-lg text-center' />
                </div>
              </section>
            )}
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("rentalDays")}</p>
          {isCartLoading ? <Skeleton className='h-4 w-10' /> : <p className='font-medium'>{rentalDays}d</p>}
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("dayPrice")}</p>
          {isCartLoading ? <Skeleton className='h-4 w-10' /> : <p className='font-medium'>{car.price} KWD</p>}
        </div>

        <div className='border-t border-dashed border-t-main-gray pt-4'></div>

        <div className='flex justify-between items-center'>
          <p className='font-medium'>{t("total")}</p>
          {isCartLoading ? <Skeleton className='h-4 w-10' /> : <p className='font-medium'>{total.toFixed(2)} KWD</p>}
        </div>
      </div>

      {isCartLoading ? (
        <Skeleton className='w-full h-14 rounded-full' />
      ) : isAdded ? (
        <LoadingButton loading={removeMutation.isPending} onClick={handleRemoveFromCart} className='w-full h-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-lg'>
          {t("removeFromCart")}
        </LoadingButton>
      ) : (
        <LoadingButton loading={addMutation.isPending} onClick={handleAddToCart} className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
          {t("addToCart")}
        </LoadingButton>
      )}
    </div>
  )
}
