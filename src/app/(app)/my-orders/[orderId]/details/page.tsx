"use client";

import { useState } from "react";

import { ChevronLeft } from "lucide-react";
import ServiceCard from "../../../services/_components/company-card";

export default function CarWashDetail() {
  const [washItems, setWashItems] = useState(
    Array(9).fill({
      type: "Wash type",
      price: 10,
    })
  );

  const totalPrice = washItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 my-10">
      <div className="flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="border-r border-gray-200 p-6 md:w-1/2">
          <button className="mb-4 rounded-full p-2 hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>

          <ServiceCard
            service={{
              dontIncludeStars: false,
              title: "Car Wash",
              location: "Kuwait City",
              rating: { orderId },
            }}
          />

          <div className="rounded-xl bg-main-gray p-4 text-sm text-gray-600 mt-4">
            <p>
              A car wash is a specialized facility that offers cleaning and
              maintenance services for various types of vehicles. The primary
              goal is to remove dirt, dust, and grime from the vehicle's
              exterior while also ensuring the interior is clean and
              well-maintained. Car washes are a convenient solution for vehicle
              owners seeking comprehensive and high-quality cleaning services.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 md:w-1/2">
          <div className="mb-6 space-y-4">
            {washItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{item.type}</span>
                <div className="flex items-center gap-2">
                  <span>{item.price}KWD</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6 border-t border-dashed border-gray-300 pt-4">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{totalPrice}KWD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
