import { useCategories } from "@/hooks/data/use-categories"
import { useUser } from "@/hooks/auth/use-user"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CategoriesLoadingState } from "./categories-loading"
import { CreateCategoryModal } from "./create-category-modal"

import Link from "next/link"
import Image from "next/image"

import routes from "@/lib/route"

export const CategoriesList = () => {
  const { categories, isCategoriesLoading, isCategoriesFetching } = useCategories()

  const user = useUser()

  return (
    <div>
      {isCategoriesLoading || isCategoriesFetching ? (
        <CategoriesLoadingState />
      ) : (
        <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
          <Carousel opts={{ align: "start" }} className='w-full'>
            <CarouselContent>
              {true && ( // TODO: Change this condition to check if the user is a admin
                <CarouselItem className='md:basis-1/12 lg:basis-1/12'>
                  <CreateCategoryModal />
                </CarouselItem>
              )}

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
      )}
    </div>
  )
}
