"use client"

import Image from "next/image"

import { ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"

export default function CartDetailsLeftSide() {
  const t = useTranslations()

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

      <div className='divide-y'>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={`product-cart-${i}`} className='flex items-center gap-4 py-4'>
              <div className='bg-gray-100 p-2 rounded-lg'>
                <Image
                  src='/defaults/cars/01.png'
                  alt='Nissan NV200'
                  width={80}
                  height={80}
                  className='object-contain'
                />
              </div>
              <div className='flex-1'>
                <h2 className='text-lg font-medium'>Nissan NV200</h2>
              </div>
              <div className='text-right'>
                <p className='font-medium'>250KWD</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
