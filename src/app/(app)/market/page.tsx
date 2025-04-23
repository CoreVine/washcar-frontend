import MarketProductsList from "./_components/products-list"
import MarketSearch from "./_components/search"

import { getTranslations } from "next-intl/server"

import { CategoriesList } from "@/components/common/categories/list"
import { AdsList } from "@/components/common/ads"
import { TSearchParams } from "@/types/default"
import { AppSearch } from "@/components/common/search"

type Props = {
  searchParams: Promise<TSearchParams>
}

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("services"),
    description: t("home")
  }
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams

  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <AppSearch />
        <CategoriesList />
        <AdsList />
        <MarketProductsList sp={params} />
      </section>
    </div>
  )
}
