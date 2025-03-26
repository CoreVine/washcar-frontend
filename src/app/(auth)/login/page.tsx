export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("loginPage.title"),
    description: t("loginPage.subtitle")
  }
}

import { Metadata } from "next"
import LoginForm from "./_components/login-form"
import { getTranslations } from "next-intl/server"

export default function Page() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
