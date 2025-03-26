import { LANGUAGE_COOKIE } from "@/lib/constants"
import { Languages } from "@/lib/type-lists"
import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  const store = await cookies()
  const language = store.get(LANGUAGE_COOKIE)?.value || "en"
  const locale = Languages.all.includes(language) ? language : "en"

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
