"use client"

import { Button } from "@/components/ui/button"

import { useTranslations } from "next-intl"

export default function CartDetailsRightSide() {
  const t = useTranslations()

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("products")}</p>
          <p className='font-medium'>250KWD</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("services")}</p>
          <p className='font-medium'>250KWD</p>
        </div>

        <div className='border-t border-dashed border-t-main-gray pt-4'></div>

        <div className='flex justify-between items-center'>
          <p className='font-medium'>{t("total")}</p>
          <p className='font-medium'>750KWD</p>
        </div>
      </div>

      <Button className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
        {t("addToCart")}
      </Button>
    </div>
  )
}
