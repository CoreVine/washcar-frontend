import { MyOrdersTabs } from "../_components/tabs"
import { MyOrdersPageHeader } from "../_components/header"
import { ServiceOrderDetails } from "../_components/services/single-order"

export default function CarWashServices() {
  const services = Array(10).fill({
    title: "Rewash car",
    location: "Salmiya - Al Taawin Street",
    rating: 5,
    image: "/defaults/products/01.png"
  })

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <MyOrdersTabs />
      <MyOrdersPageHeader title='services' />

      <div className='grid grid-cols-1 md:grid-cols-2'>
        {services.map((service, index) => (
          <ServiceOrderDetails key={index} service={service} />
        ))}
      </div>
    </div>
  )
}
