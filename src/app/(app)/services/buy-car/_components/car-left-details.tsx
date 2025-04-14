import { Car } from "@/types/models"
import Image from "next/image"

type Props = {
  car: Car
}

export const CarLeftDetails = ({ car }: Props) => {
  // Get the first image from the car.images array, or use fallback if not available
  const imageUrl = car.images?.[0]?.image_url || "/defaults/cars/01.png"
  
  // Format display values
  const modelName = car.make ? `${car.make} ${car.model}` : car.model || ""
  const price = car.price_per_day || car.price || 0
  
  return (
    <div className="p-6">
      <div className="flex items-start mb-6">
        <div className="relative h-20 w-20 overflow-hidden rounded-md bg-gray-100 flex-shrink-0">
          <Image 
            src={imageUrl} 
            alt={modelName} 
            className="object-cover" 
            fill 
          />
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-medium">{modelName}</h2>
          <div className="text-gray-700">{price} KWD</div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <p className="text-gray-600 text-sm leading-relaxed">
          A car wash is a specialized facility that offers cleaning and maintenance services for various types of vehicles. The primary goal is to remove dirt, dust, and grime from the vehicle's exterior while also ensuring the interior is clean and well-maintained. Car washes are a convenient solution for vehicle owners seeking comprehensive and high-quality cleaning services.
        </p>
      </div>
    </div>
  )
} 