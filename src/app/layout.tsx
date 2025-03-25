import "./globals.css"

import { loadFont, loadPageDirection } from "@/lib/fonts"
import { getLocale, getMessages } from "next-intl/server"

import { AuthProvider, ReactQueryClientProvider, StoreProvider } from "@/providers"
import { NextIntlClientProvider } from "next-intl"
import { ToastContainer } from "react-toastify"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const messages = await getMessages()

  const user = undefined

  return (
    <html lang={locale} dir={loadPageDirection(locale)}>
      <body className={loadFont(locale)}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ReactQueryClientProvider>
            <AuthProvider value={user}>
              <StoreProvider>{children}</StoreProvider>
              <ToastContainer />
            </AuthProvider>
          </ReactQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
