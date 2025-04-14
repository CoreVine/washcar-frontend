
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { getBrands } from "@/actions/Brands"

type Props = {
  onBrandSelect: (brandId: number) => void
}

const RentCarCategoriesList = ({ onBrandSelect }: Props) => {
  const [brands, setBrands] = useState<any[]>([])

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands()
        setBrands(data)
      } catch (err) {
        console.error("Error loading brands:", err)
      }
    }

    fetchBrands()
  }, [])

  return (
    <div className="max-w-7xl flex flex-col gap-6 mx-auto justify-center px-4">
      <div className="flex flex-wrap gap-6 justify-center">
        {brands.map((Brand) => (
          <button
            key={Brand.brand_id}
            onClick={() => onBrandSelect(Brand.brand_id)}
            className="bg-main-gray p-4 rounded-xl flex justify-center items-center size-20"
          >
            <Image src={Brand.logo} alt={Brand.name} width={60} height={60} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default RentCarCategoriesList


