import { getTranslations } from "next-intl/server"
import { getBuyingCars } from "@/actions/cars"

import BuyCarSearch from "./_components/search"
import BuyCarBrandsList from "./_components/brands-list"
import BuyCarCarsList from "./_components/products-list"
import { SimplePagination } from "@/components/common/simple-pagination"
import { AppSearch } from "@/components/common/search"
import { TSearchParams } from "@/types/default"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("buyCar"),
    description: t("buyCar")
  }
}

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function BuyCarPage({ searchParams }: Props) {
  const sp = await searchParams
  console.log({ sp })
  const cars = await getBuyingCars({ ...sp, type: "sale" })

  return (
    <div className='max-w-screen-xl mx-auto px-4 py-6 space-y-4'>
      <AppSearch />
      <BuyCarBrandsList />
      <BuyCarCarsList cars={cars.data} />
      <SimplePagination hasNextPage={!!cars.nextPage} hasPrevPage={!!cars.nextPage} />
    </div>
  )
}
