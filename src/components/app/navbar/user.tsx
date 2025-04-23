"use client"

import routes from "@/lib/route"
import Image from "next/image"

import { useUser } from "@/hooks/auth/use-user"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useLogout } from "@/hooks/auth/use-logout"

import { cn } from "@/lib/utils"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { LinkBtn } from "@/components/common/link-button"
import { LogIn, UserPlus } from "lucide-react"
import { DEFAULT_USER_IMAGE } from "@/lib/constants"

export default function NavbarUserDropdown() {
  const user = useUser()
  const router = useRouter()
  const t = useTranslations()

  const logoutMutation = useLogout()

  if (!user?.user) {
    return (
      <div className='flex gap-2'>
        <LinkBtn href={routes.login} icon={LogIn} variant='outline'>
          {t("login")}
        </LinkBtn>
        <LinkBtn href={routes.register} icon={UserPlus}>
          {t("register")}
        </LinkBtn>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src={user?.user?.profile_picture_url || DEFAULT_USER_IMAGE} width={40} height={40} alt='User Image' className='rounded-full size-14' />
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
