import { getTranslations } from "next-intl/server"

import RegisterForm from "./_components/register-form"
import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"
import routes from "@/lib/route"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("registerPage.title"),
    description: t("registerPage.subtitle")
  }
}

export default async function RegisterPage() {
  const user = await getUser()
  // if (user) return redirect(routes.myAccount)

  return <RegisterForm />
}
