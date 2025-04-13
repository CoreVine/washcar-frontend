"use client"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Company, WashCarType } from "@/types/models"
import { useWashCarCartStore } from "@/store/features/cart/wash-car"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"

type Props = {
  company: Company
}

export const CompanyRightDetails = ({ company }: Props) => {
  const t = useTranslations()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [services, setServices] = useState<WashCarType[]>([])

  const { addCarWash, emptyCarWash, types } = useWashCarCartStore()

  const washTypes = company.wash_types || []
  const selectedWashType = washTypes[currentIndex]

  const handleAddToServices = () => {
    if (!selectedWashType) return
    setServices([...services, selectedWashType])
  }

  const handleRemoveFromServices = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
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

  const total = services.reduce((total, s) => total + Number(s.price), 0) ?? 0

  const handleAddToCart = () => {
    emptyCarWash()
    services.forEach((service) => {
      addCarWash({
        type_id: service.type_id,
        company_id: company.company_id,
        name: service.name,
        quantity: 1,
        totalPrice: Number(service.price),
        unitPrice: Number(service.price)
      })
    })

    setServices([])
    toast.success(t("addedToCart"))
  }

  console.log(types)

  if (!washTypes.length) return <div className='p-6'>{t("noWashTypesAvailable")}</div>

  return (
    <div className='p-6 md:w-1/2'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center'>
          <button onClick={handlePrev} disabled={currentIndex === 0} className={`rounded-full cursor-pointer p-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}>
            <ChevronLeft size={20} />
          </button>

          <span className='mx-2 font-medium'>{selectedWashType?.name}</span>

          <button onClick={handleNext} disabled={currentIndex === washTypes.length - 1} className={`rounded-full cursor-pointer p-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className='flex items-center gap-6'>
          <span className='font-medium'>{selectedWashType?.price} KWD</span>
        </div>

        <div className='flex items-center gap-6'>
          <button onClick={handleAddToServices} className='rounded-3xl text-sm cursor-pointer px-4 py-2 bg-main-gray hover:bg-gray-100'>
            {t("add")}
          </button>
        </div>
      </div>

      {services.length > 0 ? (
        <div className='mb-6 space-y-4'>
          {services.map((service, index) => (
            <div key={index} className='flex items-center justify-between'>
              <span>{service.name}</span>
              <div className='flex items-center gap-2'>
                <span>{service.price} KWD</span>
                <button onClick={() => handleRemoveFromServices(index)} className='rounded-full cursor-pointer p-1 hover:bg-main-gray'>
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='mb-6 space-y-4 text-center text-lg text-gray-500'>{t("noServiceAvailable")}</div>
      )}

      <div className='mb-6 border-t border-dashed border-gray-300 pt-4'>
        <div className='flex items-center justify-between font-medium'>
          <span>{t("total")}</span>
          <span>{services.reduce((total, s) => total + Number(s.price), 0)} KWD</span>
        </div>
      </div>

      <Button onClick={handleAddToCart} disabled={total == 0} className='w-full rounded-full bg-blue-500 py-3 font-medium text-white hover:bg-blue-600'>
        {t("addToCart")}
      </Button>
    </div>
  )
}
