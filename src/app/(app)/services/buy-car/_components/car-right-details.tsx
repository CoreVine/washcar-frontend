"use client"

import { useTranslations } from "next-intl"
import { Car } from "@/types/models"
import { useBuyCarCartStore } from "@/store/features/cart/buy-car"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Service fee percentage for car purchase service
const SERVICE_FEE = 0.015; // 1.5%

type CarService = {
  id: number;
  name: string;
  price: number;
}

type Props = {
  car: Car
}

export const CarRightDetails = ({ car }: Props) => {
  const t = useTranslations()
  const [selectedServices, setSelectedServices] = useState<CarService[]>([]);
  
  const { addCar, emptyCar } = useBuyCarCartStore()
  
  // Get the first image from the car.images array, or use fallback if not available
  const imageUrl = car.images?.[0]?.image_url || "/defaults/cars/01.png"
  
  // Parse the car price - convert from string or use default
  const rawCarPrice = car.price_per_day || car.price;
  const carPrice = typeof rawCarPrice === 'string' ? parseFloat(rawCarPrice) : Number(rawCarPrice) || 100;
  
  // Calculate service fee
  const serviceFee: CarService = {
    id: 1,
    name: "Standard Service Fee",
    price: Math.round(carPrice * SERVICE_FEE * 100) / 100
  };
  
  // Initialize with default service
  if (selectedServices.length === 0) {
    setSelectedServices([serviceFee]);
  }
  
  // Calculate total price
  const totalServicesPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalPrice = carPrice + totalServicesPrice;
  
  const handleAddToCart = () => {
    emptyCar() // Following car wash pattern of emptying cart first
    addCar({
      car_id: car.car_id,
      make: car.make || "",
      model: car.model || "",
      quantity: 1,
      totalPrice: totalPrice,
      unitPrice: carPrice,
      image_url: imageUrl
    })
    
    toast.success(t("addedToCart"))
  }
  
  return (
    <div className="md:w-1/2 p-6">
      {/* Car Price */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Car price</span>
          <span className="font-medium">{carPrice.toFixed(2)} KWD</span>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="mb-6 space-y-4">
        {selectedServices.map((service) => (
          <div key={service.id} className="flex items-center justify-between">
            <span>{service.name}</span>
            <span>{service.price.toFixed(2)} KWD</span>
          </div>
        ))}
      </div>
      
      {/* Total Section */}
      <div className="mb-6 border-t border-dashed border-gray-300 pt-4">
        <div className="flex items-center justify-between font-medium">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} KWD</span>
        </div>
      </div>
      
      {/* Add to Cart Button */}
      <Button 
        onClick={handleAddToCart}
        className="w-full rounded-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg"
      >
        {t("addToCart")}
      </Button>
    </div>
  )
} 