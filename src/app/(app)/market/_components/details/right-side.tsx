"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

import { useTranslations } from "next-intl"

export default function MarketDetailsRightSide() {
  const t = useTranslations()

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex xl:flex-row flex-col xl:items-center gap-2'>
            <Button icon={Plus} className='size-7 rounded-4xl px-6 '></Button>
            <p>10</p>
            <Button
              variant='secondary'
              className='bg-main-gray text-main-black  px-6 size-7 rounded-4xl'
              icon={Minus}
            ></Button>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("quantity")}</p>
          <p className='font-medium'>3</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("itemPrice")}</p>
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
