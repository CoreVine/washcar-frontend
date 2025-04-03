import VerifyEmailForm from "./_components/verify-email-form"

import { getTranslations } from "next-intl/server"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("verifyEmailPage.title"),
    description: t("verifyEmailPage.subtitle")
  }
}

export default function Page() {
  return <VerifyEmailForm />
}
