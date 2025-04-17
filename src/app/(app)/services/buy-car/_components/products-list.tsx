"use client"

import routes from "@/lib/route"

import { useTranslations } from "next-intl"

import { CarCard } from "@/components/common/cars/car-card"
import { Car } from "@/types/models"

export default function BuyCarCarsList({ cars }: { cars: Car[] }) {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("products")}</p>
      <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
        {cars.map((car) => (
          <CarCard key={`car-list-item-${car.car_id}`} id={car.car_id} url={routes.buyCar(car.car_id)} title={car.model} subtitle={car.model} image={car.images[0]?.image_url ?? "/defaults/cars/01.png"} />
        ))}
      </section>
    </div>
  )
}
