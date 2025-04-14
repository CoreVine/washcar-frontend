"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { getCarById } from "@/actions/Cars";
import { Cars } from "@/types/models";

export default function RentCarDetailsLeftSide() {
  const { cardId } = useParams();
  console.log(cardId);
  
  const [car, setCar] = useState<Cars | null>(null);
  const t = useTranslations();

  useEffect(() => {
    const fetchCar = async () => {
      if (cardId) {
        console.log("Fetching car data for ID:", cardId);
        try {
          const carData = await getCarById(Number(cardId));
          console.log("Car Data:", carData);
          setCar(carData);
        } catch (err) {
          console.error("Error fetching car details:", err);
        }
      }
    };

    fetchCar();
  }, [cardId]);

  if (!car) return <div>Loading ...</div>;

  return (
    <div className="xl:w-1/2 border-r p-6 space-y-6">
      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>

      <div className="flex items-center gap-4 py-4">
        <div className="bg-gray-100 p-2 rounded-lg">
          <Image
            src={car.images[0]?.image_url}
            alt={car?.model}
            width={80}
            height={80}
            className="object-contain"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-medium">{car.model}</h2>
        </div>
        <div className="text-right">
          <p className="font-medium">{car.price_per_day} KWD</p>
        </div>
      </div>

      <div className="border-t pt-4"></div>

      <div className="bg-main-gray p-6 rounded-lg">
        <p className="text-gray-700 text-sm leading-relaxed">
          {t("dummyProductDescription")}
        </p>
      </div>
    </div>
  );
}
