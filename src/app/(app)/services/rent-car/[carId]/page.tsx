import { getTranslations } from "next-intl/server"
import RentCarDetailsLeftSide from "../_components/details/left-side"
import RentCarDetailsRightSide from "../_components/details/right-side"

import { getCarById } from "@/actions/cars"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    carId: string
  }>
}

export const generateMetadata = async () => {
  const t = await getTranslations()

  return {
    title: t("rentCar"),
    description: t("rentCar")
  }
}

export default async function CarRentalBooking({ params }: Props) {
  const { carId } = await params
  const car = await getCarById(+carId)

  if (!car) return notFound()

  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row'>
      <RentCarDetailsLeftSide car={car} />
      <RentCarDetailsRightSide car={car} />
    </div>
  )
}
