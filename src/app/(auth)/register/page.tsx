import { getTranslations } from "next-intl/server"

import RegisterForm from "./_components/register-form"
import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import routes from "@/lib/route"
import { cookies } from "next/headers"
import { LANGUAGE_COOKIE } from "@/lib/constants"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("registerPage.title"),
    description: t("registerPage.subtitle")
  }
}

export default async function RegisterPage() {
  const user = await getUser()
  if (user?.user) return redirect(routes.myAccount)

  return <RegisterForm />
}
