import CartDetailsLeftSide from "./_components/left-side"
import CartDetailsRightSide from "./_components/right-side"

import { getUser } from "@/actions/auth"
import { redirect } from "next/navigation"

export default async function CartDetailsPage() {
  const user = await getUser()
  if (!user?.user) return redirect("/login")

  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row py-20'>
      <CartDetailsLeftSide />
      <CartDetailsRightSide />
    </div>
  )
}
