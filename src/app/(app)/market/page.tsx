import { getTranslations } from "next-intl/server"
import MarketSearch from "./_components/search"
import MarketCategoriesList from "./_components/categories-list"
import MarketAdsImages from "./_components/ads"
import MarketProductsList from "./_components/products-list"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("Services"),
    description: t("home")
  }
}

export default function Page() {
  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <MarketSearch />
        <MarketCategoriesList />
        <MarketAdsImages />
        <MarketProductsList />
      </section>
    </div>
  )
}
