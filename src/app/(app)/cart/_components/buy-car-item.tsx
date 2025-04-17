import { Car } from "@/types/models"

import Image from "next/image"

type Props = {
  car: Car
}

export const BuyCarItem = ({ car }: Props) => {
  return (
    <div className='flex items-center gap-4 py-4'>
      <div className='bg-gray-100 p-2 rounded-lg'>
        <Image src='/defaults/cars/01.png' alt='Nissan NV200' width={80} height={80} className='object-contain size-20 rounded-md' />
      </div>
      <div className='flex-1'>
        <h2 className='text-lg font-medium'>{car?.model}</h2>
      </div>
      <div className='text-right'>
        <p className='font-medium'>{car.price}KWD</p>
      </div>
    </div>
  )
}
