import routes from "@/lib/route"

import { ShoppingCart } from "lucide-react"
import { LinkBtn } from "@/components/common/link-button"

export default function NavbarShoppingCartDrawer() {
  return (
    <LinkBtn href={routes.cart} className='bg-main-gray text-black cursor-pointer' variant='secondary' size='icon'>
      <ShoppingCart size={16} fill='black' />
    </LinkBtn>
  )
}
