"use client"

import Image from "next/image"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DEFAULT_USER_IMAGE } from "@/lib/constants"

import { useUser } from "@/hooks/auth/use-user"
import { useRouter } from "next/navigation"
import routes from "@/lib/route"
import { useTranslations } from "next-intl"
import { useLogout } from "@/hooks/auth/use-logout"
import { cn } from "@/lib/utils"

export default function NavbarUserDropdown() {
  const user = useUser()
  const router = useRouter()
  const t = useTranslations()

  const logoutMutation = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src={user?.profile_picture_url || DEFAULT_USER_IMAGE} width={40} height={40} alt='User Image' className='rounded-full size-14' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(routes.myAccount)}>{t("profile")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => logoutMutation.mutate()} disabled={logoutMutation.loading} className={cn(logoutMutation.loading && "opacity-50 cursor-not-allowed")}>
          {t("logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
