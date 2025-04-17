"use client"

import Image from "next/image"

import { useBrands } from "@/hooks/data/use-brands"
import { CategoriesLoadingState } from "../categories/loading-state"

export const BrandsList = () => {
  const { brands, isBrandsLoading } = useBrands()

  if (isBrandsLoading) return <CategoriesLoadingState />

  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      {brands?.map((brand, i) => (
        <div key={i} className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
          <Image src={"/defaults/nissan.png"} alt={brand.name} width={60} height={60} />
        </div>
      ))}
    </div>
  )
}
