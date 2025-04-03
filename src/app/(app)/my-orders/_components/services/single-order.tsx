import { Star } from "lucide-react"
import Image from "next/image"

type Props = {
  service: any
}

export const ServiceOrderDetails = ({ service }: Props) => {
  return (
    <div className='flex items-center p-4 border-b'>
      <div className='flex-shrink-0 mx-4'>
        <div className='bg-main-gray p-2 rounded-lg'>
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            width={60}
            height={60}
            className='object-contain'
          />
        </div>
      </div>
      <div className='flex-grow'>
        <h3 className='font-medium'>{service.title}</h3>
      </div>
      <div className='flex-shrink-0 flex flex-col gap-6'>
        <p className='text-xs text-gray-500'>{service.location}</p>

        <div className='flex gap-2'>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className='w-4 h-4 text-blue-500 fill-current' />
            ))}
        </div>
      </div>
    </div>
  )
}
