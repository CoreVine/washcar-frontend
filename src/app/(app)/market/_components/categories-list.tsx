"use client"

import Image from "next/image"

import { useCategories } from "@/hooks/data/use-categories"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CategoriesLoadingState } from "@/components/common/categories/categories-loading"
import Link from "next/link"
import routes from "@/lib/route"
import { CategoriesList } from "@/components/common/categories/categories-list"

const MarketCategoriesList = () => {
  return <CategoriesList />
}

export default MarketCategoriesList
