"use client"

import ProductCard from "@/components/common/products/card"
import { useTranslations } from "next-intl"

export default function RentCarProductsList() {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("products")}</p>
      <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/01.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/02.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/03.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/04.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/01.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/02.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/03.png' />
        <ProductCard title='Product 1' subtitle='Subtitle 1' image='/defaults/cars/04.png' />
      </section>
    </div>
  )
}
