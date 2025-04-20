import { getTranslations } from "next-intl/server"
import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"

import LoginForm from "./_components/login-form"

import routes from "@/lib/route"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("loginPage.title"),
    description: t("loginPage.subtitle")
  }
}

export default async function Page() {
  const user = await getUser()
  if (user?.user) return redirect(routes.myAccount)

  return <LoginForm />
}
