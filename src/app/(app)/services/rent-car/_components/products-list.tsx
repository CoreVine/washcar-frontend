

"use client"
import { useEffect, useState } from "react"
import ProductCard from "@/components/common/products/card"
import { useTranslations } from "next-intl"
import { getCars } from "@/actions/Cars"
import { Cars } from "@/types/models"

type Props = {
  selectedBrandId: number | null
}

export default function RentCarProductsList({ selectedBrandId }: Props) {
  const t = useTranslations()
  const [cars, setCars] = useState<Cars[]>([])

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars()
        setCars(data)
      } catch (error) {
        console.error(error)
        setCars([])
      }
    }

    fetchCars()
  }, [])

  const filteredCars = selectedBrandId
    ? cars.filter((car) => car.brand.brand_id === selectedBrandId)
    : cars

  return (
    <div className="max-w-6xl mx-auto space-y-2 px-4">
      <p className="text-lg">{t("Rent a car")}</p>
      <section className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
        {filteredCars.map((car) => (
          <ProductCard
            key={car?.car_id}
            id={car?.car_id}
            title={car?.model}
            subtitle={car?.brand.name}
            image={car.images[0]?.image_url || "/defaults/cars/01.png"}
          />
        ))}
      </section>
    </div>
  )
}

