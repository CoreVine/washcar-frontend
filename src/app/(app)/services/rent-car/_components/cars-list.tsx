"use client"

import { useTranslations } from "next-intl"
import { Car } from "@/types/models"
import { CarCard } from "@/components/common/cars/car-card"
import routes from "@/lib/route"

type Props = {
  cars: Car[]
}

export default function RentCarCarsList({ cars }: Props) {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("Rent a car")}</p>
      <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
        {cars.map((car) => (
          <CarCard key={car?.car_id} url={routes.rentCar(car.car_id)} id={car.car_id} title={car.model} subtitle={car.brand.name} image={car.images?.[0]?.image_url || "/defaults/cars/01.png"} />
        ))}
      </section>
    </div>
  )
}
