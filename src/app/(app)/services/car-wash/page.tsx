import ServicesSearch from "../_components/search"
import ServiceCard from "../_components/car-wash-service-card"

import { Settings2 } from "lucide-react"
import { getTranslations } from "next-intl/server"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("services"),
    description: t("services")
  }
}

export default function CarWashPage() {
  const carWashServices = Array(12).fill({
    title: "Rewash car",
    location: "Salmiya - Al Taawon Street",
    rating: 4
  })

  return (
    <div className='container mx-auto px-4 py-8'>
      <ServicesSearch />

      <div className='my-6 flex items-center justify-between'>
        <h1 className='text-xl text-main-black'>Car wash</h1>
        <Settings2 />
      </div>

      <div className='grid grid-cols-1 gap-20 md:grid-cols-2'>
        {carWashServices.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </div>
  )
}
