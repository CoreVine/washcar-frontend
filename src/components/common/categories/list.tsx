"use client"

import Image from "next/image"
import Link from "next/link"

import routes from "@/lib/route"

import { useCategories } from "@/hooks/data/use-categories"
import { useUser } from "@/hooks/auth/use-user"

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { CategoriesLoadingState } from "@/components/common/categories/loading-state"
import { CreateCatetoryModal } from "./create-modal"

export const CategoriesList = ({ itemUrl = "/" }: { itemUrl?: string }) => {
  const { categories, isCategoriesLoading } = useCategories()
  const user = useUser()

  if (isCategoriesLoading) return <CategoriesLoadingState />

  return (
    <div className='max-w-6xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      <Carousel
        opts={{
          align: "start"
        }}
        className='w-full'
      >
        <CarouselContent>
          <CreateCatetoryModal />
          {categories?.map((category, i) => (
            <CarouselItem key={i} className='md:basis-1/12 lg:basis-1/12 basis-1/4'>
              <Link href={routes.categories(category.category_id)} key={i} className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
                <Image src='/defaults/nissan.png' alt='Nissan' width={60} height={60} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
