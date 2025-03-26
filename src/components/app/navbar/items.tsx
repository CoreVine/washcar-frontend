import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

import { useTranslations } from "next-intl"
import Link from "next/link"

export default function NavbarItems() {
  const t = useTranslations()

  return (
    <ul className='flex gap-8'>
      <li>
        <Link href=''>{t("navbar.home")}</Link>
      </li>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger className='flex gap-2 items-center'>
            {t("navbar.services")}
            <ChevronDown size={16} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
      <li>
        <Link href=''>{t("navbar.market")}</Link>
      </li>
      <li>
        <Link href=''>{t("navbar.myOrders")}</Link>
      </li>
      <li>
        <Link href=''>{t("navbar.myAccount")}</Link>
      </li>
    </ul>
  )
}
