import Link from "next/link"
import routes from "@/lib/route"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/auth/use-user"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function NavbarItems() {
  const router = useRouter()
  const user = useUser()
  const t = useTranslations()

  if (user?.employeeData) {
    return (
      <ul className='flex gap-8'>
        <li>
          <Link href={routes.market}>{t("products")}</Link>
        </li>

        <li>
          <Link href={"/company"}>{t("carWash")}</Link>
        </li>

        <li>
          <Link href={""}>{t("carOrders")}</Link>
        </li>

        <li>
          <Link href={""}>{t("users")}</Link>
        </li>
        <li>
          <Link href={"/company"}>{t("company")}</Link>
        </li>
        <li>
          <Link href={""}>{t("myAccount")}</Link>
        </li>
      </ul>
    )
  }

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
            <DropdownMenuItem onClick={() => router.push(routes.services("car-wash"))}>{t("carWash")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.services("rent-car"))}>{t("rentCar")}</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(routes.services("buy-car"))}>{t("buyACar")}</DropdownMenuItem>
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
