"use client"
import RentCarDetailsLeftSide from "../_components/details/left-side"
import RentCarDetailsRightSide from "../_components/details/right-side"
import { useState, useEffect } from "react";
import { getCarById } from "@/actions/Cars";
import { useParams } from "next/navigation";
import { Cars } from '@/types/models';

export default function CarRentalBooking() {
  const { cardId } = useParams();
  const [car, setCar] = useState<Cars | null>(null);
  
  useEffect(() => {
    const fetchCar = async () => {
      if (cardId) {
        try {
          const carData = await getCarById(Number(cardId));
          setCar(carData);
        } catch (err) {
          console.error("Error fetching car details:", err);
        }
      }
    };
    fetchCar();
  }, [cardId]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row'>
      <RentCarDetailsLeftSide />
      <RentCarDetailsRightSide car={car} /> {/* تمرير بيانات السيارة كـ prop */}
    </div>
  )
}
