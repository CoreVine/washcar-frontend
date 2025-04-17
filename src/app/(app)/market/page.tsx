import MarketSearch from "./_components/search"
import MarketCategoriesList from "./_components/categories-list"
import MarketProductsList from "./_components/products-list"

import { getTranslations } from "next-intl/server"
import { AdsList } from "@/components/common/ads"
import { CategoriesList } from "@/components/common/categories/list"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("services"),
    description: t("home")
  }
}

export default function Page() {
  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <MarketSearch />
        <CategoriesList />
        <AdsList />
        <MarketProductsList />
      </section>
    </div>
  )
}
