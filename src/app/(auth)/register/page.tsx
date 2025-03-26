import { getTranslations } from "next-intl/server"

import RegisterForm from "./_components/register-form"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("registerPage.title"),
    description: t("registerPage.subtitle")
  }
}

export default function RegisterPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
