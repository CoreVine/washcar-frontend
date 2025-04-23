import Image from "next/image"
import AppLogo from "@/components/common/logo"

import routes from "@/lib/route"

import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useUser } from "@/hooks/auth/use-user"

import { cn } from "@/lib/utils"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { ChevronDown, LogIn, Menu, UserPlus } from "lucide-react"
import { LinkBtn } from "@/components/common/link-button"
import { Button } from "@/components/ui/button"

import { DEFAULT_USER_IMAGE } from "@/lib/constants"
import { useLogout } from "@/hooks/auth/use-logout"
import Link from "next/link"
import { useState } from "react"

export const MobileSheet = () => {
  const logoutMutation = useLogout()

  const router = useRouter()
  const user = useUser()
  const t = useTranslations()

  const [open, setOpen] = useState(false)

  const handleRedirect = (url: string) => {
    setOpen(false)
    router.push(url)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='outline' icon={Menu} />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <AppLogo />
        </SheetHeader>

        {user?.employeeData ? (
          <ul className='flex flex-col gap-1'>
            <li onClick={() => handleRedirect(routes.market)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("products")}
            </li>
            <li onClick={() => handleRedirect(routes.carWash)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("carWash")}
            </li>
            <li onClick={() => handleRedirect(routes.carOrders)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("carOrders")}
            </li>
            <li onClick={() => handleRedirect(routes.users)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("users")}
            </li>
            <li onClick={() => handleRedirect(routes.company)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("company")}
            </li>
            <li onClick={() => handleRedirect(routes.myAccount)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("myAccount")}
            </li>
          </ul>
        ) : (
          <ul className='flex flex-col gap-4'>
            <li onClick={() => handleRedirect(routes.home)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("navbar.home")}
            </li>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex gap-2 items-center'>
                <li className='flex gap-2 items-center w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
                  {t("navbar.services")}
                  <ChevronDown size={16} />
                </li>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push(routes.services("car-wash"))}>{t("carWash")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(routes.services("rent-car"))}>{t("rentCar")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(routes.services("buy-car"))}>{t("buyACar")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <li onClick={() => handleRedirect(routes.market)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
              {t("navbar.market")}
            </li>
            {user?.user && (
              <>
                <li onClick={() => handleRedirect(routes.myOrders)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
                  {t("navbar.myOrders")}
                </li>
                <li onClick={() => handleRedirect(routes.myAccount)} className='block w-full p-2 hover:bg-main-gray rounded-md mx-4 cursor-pointer'>
                  {t("navbar.myAccount")}
                </li>
              </>
            )}
          </ul>
        )}

        <SheetFooter className='flex justify-between'>
          {!user?.user ? (
            <div className='grid grid-cols-2 gap-2'>
              <LinkBtn className='w-full' href={routes.login} icon={LogIn} variant='outline'>
                {t("login")}
              </LinkBtn>
              <LinkBtn className='w-full' href={routes.register} icon={UserPlus}>
                {t("register")}
              </LinkBtn>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='flex items-center gap-4'>
                  <Image src={user?.user?.profile_picture_url || DEFAULT_USER_IMAGE} width={40} height={40} alt='User Image' className='rounded-full size-14' />
                  <p>{user?.user.name}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push(routes.myAccount)}>{t("profile")}</DropdownMenuItem>
                <DropdownMenuItem onClick={() => logoutMutation.mutate()} disabled={logoutMutation.loading} className={cn(logoutMutation.loading && "opacity-50 cursor-not-allowed")}>
                  {t("logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
