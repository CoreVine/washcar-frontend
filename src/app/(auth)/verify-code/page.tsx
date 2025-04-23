import VerifyCodeForm from "./_components/verify-code-form"

import routes from "@/lib/route"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function VerifyCodePage() {
  const store = await cookies()

  if (!store.get("email-reset")?.value) return redirect(routes.auth.resetPassword)

  return <VerifyCodeForm />
}
