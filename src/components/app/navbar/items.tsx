import Link from "next/link"
import routes from "@/lib/route"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function NavbarItems() {
  const router = useRouter()
  const t = useTranslations()

  return (
    <ul className='flex gap-8'>
      <li>
        <Link href='/'>{t("navbar.home")}</Link>
      </li>

      <li>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex gap-2 items-center'>
            {t("navbar.services")}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push(routes.services("car-wash"))}>
              {t("carWash")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.services("rent-car"))}>
              {t("rentCar")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.services("buy-car"))}>
              {t("buyACar")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>

      <li>
        <Link href={routes.market}>{t("navbar.market")}</Link>
      </li>

      <li>
        <Link href={routes.myOrders}>{t("navbar.myOrders")}</Link>
      </li>

      <li>
        <Link href={routes.myAccount}>{t("navbar.myAccount")}</Link>
      </li>
    </ul>
  )
}
