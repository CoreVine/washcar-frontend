import HomeProductsList from "./_components/products-list"
import HomeServicesList from "./_components/services-list"

import { getTranslations } from "next-intl/server"
import { getProducts } from "@/actions/products"

import { SimplePagination } from "@/components/common/simple-pagination"
import { CategoriesList } from "@/components/common/categories/list"
import { AdsList } from "@/components/common/ads"
import { AppSearch } from "@/components/common/search"

type Props = {
  searchParams: Promise<Record<string, string>>
}

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("home"),
    description: t("home")
  }
}

export default async function Page({ searchParams }: Props) {
  const products = await getProducts(await searchParams)

  console.log("products", await searchParams)

  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <AppSearch />
        <CategoriesList />
        <AdsList />
        <HomeServicesList />
        <HomeProductsList products={products.data} />
        <SimplePagination hasNextPage={!!products.nextPage} hasPrevPage={!!products.lastPage} />
      </section>
    </div>
  )
}
