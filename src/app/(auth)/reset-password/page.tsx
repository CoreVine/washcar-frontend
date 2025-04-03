import React from "react"

import SendCodeForm from "./_components/send-code-form"

import { getTranslations } from "next-intl/server"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("sendResetCode.title"),
    description: t("sendResetCode.subtitle")
  }
}

export default function Page() {
  return <SendCodeForm />
}
