"use client"

import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

export default function ServiceCard({
  service
}: {
  service: {
    dontIncludeStars?: boolean
    title: string
    location: string
    rating: number
  }
}) {
  return (
    <div className='flex border-b justify-between border-blue-100 pb-4 pt-2 gap-4'>
      <div className='mr-4 flex-shrink-0 flex gap-4 items-center'>
        <div className='relative h-20 w-20 overflow-hidden rounded border border-gray-200'>
          <Image
            src='/defaults/services/buy.png'
            alt='Car wash equipment'
            className='h-auto w-full'
            width={100}
            height={100}
          />
        </div>
        <h3 className='text-lg'>{service.title}</h3>
      </div>

      <div className='flex flex-col space-y-4'>
        {service.dontIncludeStars && <p className='text-sm text-gray-500'>{service.location}</p>}
        {service.dontIncludeStars ? (
          <div className='flex gap-3'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < service.rating ? "fill-blue-500 text-blue-500" : "text-light-blue"}
              />
            ))}
          </div>
        ) : (
          <Badge variant='destructive'>Implemented</Badge>
        )}
      </div>
    </div>
  )
}
