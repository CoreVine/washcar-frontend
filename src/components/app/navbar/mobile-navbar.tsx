"use client"

import AppLogo from "@/components/common/logo"

import { MobileSheet } from "./mobile-sheet"

export default function MobileAppNavbar() {
  return (
    <nav>
      <div className='xl:hidden flex justify-between items-center xl:max-w-[1440px] mx-auto px-4 py-3'>
        <AppLogo />
        <MobileSheet />
      </div>
    </nav>
  )
}
