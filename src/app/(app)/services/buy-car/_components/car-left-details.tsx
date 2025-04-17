import Image from "next/image"

import { Car } from "@/types/models"

type Props = {
  car: Car
}

export const CarLeftDetails = ({ car }: Props) => {
  return (
    <div className='p-6 w-full'>
      <div className='flex items-center mb-6'>
        <div className='relative h-20 w-20 overflow-hidden rounded-md bg-gray-100 flex-shrink-0'>
          <Image src={car.images?.[0]?.image_url || "/defaults/cars/01.png"} alt={car.model} className='object-cover' fill />
        </div>
        <div className='ml-4 flex w-full items-center justify-between'>
          <h2 className='text-xl font-medium'>{car.model}</h2>
          <div className='text-gray-700'>{car.price || 0} KWD</div>
        </div>
      </div>

      <div className='bg-gray-50 p-6 rounded-lg mb-6'>
        <p className='text-gray-600 text-sm leading-relaxed'>{car.description || "N/A"}</p>
      </div>
    </div>
  )
}
