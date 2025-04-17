"use client"

import Image from "next/image"

import { Brand } from "@/types/models"
import { LinkBtn } from "@/components/common/link-button"

type Props = {
  brands: Brand[]
}

const RentCarBrandsList = ({ brands }: Props) => {
  return (
    <div className='max-w-7xl flex flex-col gap-6 mx-auto justify-center px-4'>
      <div className='flex flex-wrap gap-6 justify-center'>
        {brands.map((brand) => (
          <LinkBtn href='' className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
            <Image src={brand.logo} alt={brand.name} width={60} height={60} />
          </LinkBtn>
        ))}
      </div>
    </div>
  )
}

export default RentCarBrandsList
