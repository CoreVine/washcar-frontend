import ResetPasswordForm from "./_components/reset-password-form"

import { getTranslations } from "next-intl/server"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("resetPasswordPage.title"),
    description: t("resetPasswordPage.subtitle")
  }
}

export default function Page() {
  return <ResetPasswordForm />
}
