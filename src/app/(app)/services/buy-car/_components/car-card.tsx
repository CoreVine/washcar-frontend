"use client"

import { Car } from "@/types/models"
import Image from "next/image"
import Link from "next/link"
import routes from "@/lib/route"

type Props = {
  car: Car
}

export default function CarCard({ car }: Props) {
  // Get the first image from the car.images array, or use fallback if not available
  const imageUrl = car.images?.[0]?.image_url || "/defaults/cars/01.png"
  
  // Format the model name correctly - some cars don't have make separate from model
  const modelName = car.model || ""
  
  // Use price_per_day if available, fallback to price
  const price = car.price_per_day || car.price || "Price on request"
  
  return (
    <Link href={routes.buyCar(car.car_id)} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-full h-48 overflow-hidden bg-gray-100">
          <Image 
            src={imageUrl} 
            alt={modelName} 
            fill
            className="object-cover" 
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg mb-1">{modelName}</h3>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">{car.year}</span>
            <span className="font-medium text-blue-500">{price} KWD</span>
          </div>
        </div>
      </div>
    </Link>
  )
} 