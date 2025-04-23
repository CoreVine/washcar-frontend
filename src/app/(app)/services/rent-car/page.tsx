import { AppSearch } from "@/components/common/search"
import { SimplePagination } from "@/components/common/simple-pagination"

import { getTranslations } from "next-intl/server"
import { getBrands } from "@/actions/brands"
import { getRentalCars } from "@/actions/cars"

import RentCarCarsList from "./_components/cars-list"
import RentCarBrandsList from "./_components/brands-list"

type Props = {
  searchParams: Promise<{
    page: string
  }>
}

export const generateMetadata = async () => {
  const t = await getTranslations()

  return {
    title: t("rentCar"),
    description: t("rentCar")
  }
}

export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams

  const brands = await getBrands()
  const cars = await getRentalCars({ page, type: "rent" })

  return (
    <div className='my-10'>
      <section className='space-y-4'>
        <AppSearch />
        <RentCarBrandsList brands={brands} />
        <RentCarCarsList cars={cars.data} />
        <SimplePagination hasNextPage={!!cars.nextPage} hasPrevPage={!!cars.lastPage} />
      </section>
    </div>
  )
}
