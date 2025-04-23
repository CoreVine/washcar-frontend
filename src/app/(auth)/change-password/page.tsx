import { getTranslations } from "next-intl/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import ResetPasswordForm from "./_components/reset-password-form"
import routes from "@/lib/route"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("resetPasswordPage.title"),
    description: t("resetPasswordPage.subtitle")
  }
}

export default async function Page() {
  const store = await cookies()
  if (!store.get("reset-token")?.value) return redirect(routes.auth.resetPassword)

  return <ResetPasswordForm />
}
