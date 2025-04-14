import { getCarById } from "@/actions/cars"
import { ArrowLeft } from "lucide-react"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { CarLeftDetails } from "../_components/car-left-details"
import { CarRightDetails } from "../_components/car-right-details"
import Link from "next/link"

export const generateMetadata = async ({ params }: { params: Promise<{ carId: string }> }) => {
  const resolvedParams = await params
  const t = await getTranslations()
  return {
    title: t("buyCar"),
    description: t("buyCar")
  }
}

export default async function CarDetailPage({ params }: { params: Promise<{ carId: string }> }) {
  const resolvedParams = await params
  const car = await getCarById(Number(resolvedParams.carId))

  if (!car) {
    redirect("/services/buy-car")
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm my-8 overflow-hidden">
      <div className="pt-4 pl-6">
        <Link 
          href="/services/buy-car" 
          className="inline-flex items-center text-gray-600 hover:text-blue-500"
        >
          <ArrowLeft className="mr-1" size={16} />
          <span>Back</span>
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="md:w-1/2 md:border-r border-gray-200">
          <CarLeftDetails car={car} />
        </div>
        
        {/* Right Side */}
        <CarRightDetails car={car} />
      </div>
    </div>
  )
} 