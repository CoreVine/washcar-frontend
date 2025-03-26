"use client"

import AppLogo from "@/components/common/logo"
import NavbarShoppingCartDrawer from "./shopping-cart"
import NavbarLanguageSwitcher from "./language-switcher"
import NavbarUserDropdown from "./user"
import NavbarItems from "./items"

export default function AppNavbar() {
  return (
    <nav>
      <div className='flex justify-between items-center xl:max-w-[1440px] mx-auto px-16 py-3'>
        <AppLogo />
        <NavbarItems />
        <div className='flex gap-8'>
          <NavbarLanguageSwitcher />
          <NavbarShoppingCartDrawer />
          <NavbarUserDropdown />
        </div>
      </div>
    </nav>
  )
}
