"use client"

import Link from "next/link"
import Image from "next/image"

import { useCategorySubCategories } from "@/hooks/data/use-categories"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CategoriesLoadingState } from "@/components/common/categories/loading-state"

import routes from "@/lib/route"

const SubCategoriesList = ({ id }: { id: number }) => {
  const { subCategories, isSubCategoriesLoading } = useCategorySubCategories(id)

  if (isSubCategoriesLoading) return <CategoriesLoadingState />
  if (!subCategories || subCategories.length === 0) return null

  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      <Carousel
        opts={{
          align: "start"
        }}
        className='w-full'
      >
        <CarouselContent>
          {subCategories?.map((category, i) => (
            <CarouselItem key={i} className='md:basis-1/12 lg:basis-1/12'>
              <Link href={routes.categories(category.sub_category_id)} key={i} className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
                <Image src='/defaults/nissan.png' alt='Nissan' width={60} height={60} />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default SubCategoriesList
