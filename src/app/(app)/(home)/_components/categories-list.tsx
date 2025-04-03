"use client"

import Image from "next/image"
import Link from "next/link"

import routes from "@/lib/route"

import { useCategories } from "@/hooks/data/use-categories"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

const HomeCategoriesList = () => {
  const { categories, isCategoriesLoading } = useCategories()

  if (isCategoriesLoading) return <LoadingState />

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

const LoadingState = () => {
  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className='size-20 rounded-xl' />
      ))}
    </div>
  )
}

export default HomeCategoriesList
