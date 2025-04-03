import HomeSearch from "./_components/search"
import HomeCategoriesList from "./_components/categories-list"
import HomeProductsList from "./_components/products-list"
import HomeServicesList from "./_components/services-list"

import { getTranslations } from "next-intl/server"
import { AdsList } from "@/components/common/ads"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("home"),
    description: t("home")
  }
}

export default function Page() {
  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <HomeSearch />
        <HomeCategoriesList />
        <AdsList />
        <HomeServicesList />
        <HomeProductsList />
      </section>
    </div>
  )
}
