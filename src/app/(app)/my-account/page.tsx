import routes from "@/lib/route"

import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const user = await getUser()
  if (!user) return redirect(routes.login)

  return <pre></pre>
}
