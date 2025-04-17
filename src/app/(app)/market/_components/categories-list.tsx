"use client"

import Image from "next/image"

import { useCategories } from "@/hooks/data/use-categories"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CategoriesLoadingState } from "@/components/common/categories/loading-state"
import Link from "next/link"
import routes from "@/lib/route"

const MarketCategoriesList = () => {
  const { categories, isCategoriesLoading } = useCategories()

  if (isCategoriesLoading) return <CategoriesLoadingState />

  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      <Carousel
        opts={{
          align: "start"
        }}
        className='w-full'
      >
        <CarouselContent>
          {categories?.map((category, i) => (
            <CarouselItem key={i} className='md:basis-1/12 lg:basis-1/12'>
              <Link href={routes.categories(category.category_id)} key={i} className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
                <Image src='/defaults/nissan.png' alt='Nissan' width={60} height={60} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MarketCategoriesList
