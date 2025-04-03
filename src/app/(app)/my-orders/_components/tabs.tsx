"use client"

import { LinkBtn } from "@/components/common/link-button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"

export const MyOrdersTabs = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const activeTab = (path: string) => pathname === path
  const defaultCN =
    "rounded-full px-8 py-2 text-gray-700 bg-transparent shadow-none hover:bg-transparent cursor-pointer"

  return (
    <div className='flex justify-center mb-8'>
      <div className='bg-gray-100 p-1 rounded-full inline-flex'>
        <LinkBtn
          href='/my-orders/services'
          className={cn(
            defaultCN,
            activeTab("/my-orders/services") &&
              "rounded-full px-8 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-500 hover:text-white"
          )}
        >
          {t("services")}
        </LinkBtn>

        <LinkBtn
          href='/my-orders/products'
          className={cn(
            defaultCN,
            activeTab("/my-orders/products") &&
              "rounded-full px-8 py-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-500 hover:text-white"
          )}
        >
          {t("products")}
        </LinkBtn>
      </div>
    </div>
  )
}
