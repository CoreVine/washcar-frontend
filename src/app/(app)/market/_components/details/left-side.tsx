"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"

import { ChevronLeft } from "lucide-react"
import { Product } from "@/types/models"

export default function MarketDetailsLeftSide({ product }: { product: Product }) {
  const t = useTranslations()

  return (
    <div className='xl:w-1/2 border-r p-6 space-y-6'>
      <button className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
        <ChevronLeft className='h-5 w-5 text-gray-600' />
      </button>

      <div className='flex items-center gap-4 py-4'>
        <div className='bg-gray-100 p-2 rounded-lg'>
          <Image src={product.images?.[0].image_url || "/defaults/cars/01.png"} alt={product.product_name} width={80} height={80} className='object-contain size-20' />
        </div>
        <div className='flex-1'>
          <h2 className='text-lg font-medium'>{product.product_name}</h2>
        </div>
        <div className='text-right'>
          <p className='font-medium'>{product.price}KWD</p>
        </div>
      </div>

      <div className='border-t pt-4'></div>

      <div className='bg-main-gray p-6 rounded-lg'>
        <p className='text-gray-700 text-sm leading-relaxed'>{product.description}</p>
      </div>
    </div>
  )
}
