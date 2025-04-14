
import { getTranslations } from "next-intl/server"

import PageClient from "./[cardId]/PageClient"

export const generateMetadata = async () => {

  const t = await getTranslations()
  return {
    title: t("rentCar"),
    description: t("rentCar")
  }
}

export default function Page() {


  return (
   
    <PageClient/>
  )
}
