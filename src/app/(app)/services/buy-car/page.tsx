import { getTranslations } from "next-intl/server"

import RentCarCategoriesList from "./_components/categories-list"
import RentCarProductsList from "./_components/products-list"
import RentCarSearch from "./_components/search"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("rentCar"),
    description: t("rentCar")
  }
}

export default function Page() {
  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <RentCarSearch />
        <RentCarCategoriesList />
        <RentCarProductsList />
      </section>
    </div>
  )
}
