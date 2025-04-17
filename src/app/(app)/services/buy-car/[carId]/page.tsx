import { getCarById } from "@/actions/cars"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { CarLeftDetails } from "../_components/car-left-details"
import { CarRightDetails } from "../_components/car-right-details"

type Props = { params: Promise<{ carId: string }> }

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("buyCar"),
    description: t("buyCar")
  }
}

export default async function CarDetailPage({ params }: Props) {
  const resolvedParams = await params
  const car = await getCarById(+resolvedParams.carId)

  if (!car) return notFound()

  return (
    <div className='mx-auto max-w-7xl px-4 my-10'>
      <div className='flex flex-col md:flex-row'>
        <CarLeftDetails car={car} />
        <CarRightDetails car={car} />
      </div>
    </div>
  )
}
