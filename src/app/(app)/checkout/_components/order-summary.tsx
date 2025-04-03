"use client"

import { useTranslations } from "next-intl"

export default function CheckoutOrderSummary() {
  const t = useTranslations()

  return (
    <div className='space-y-3 pt-4'>
      <div className='flex justify-between'>
        <span className='text-gray-700'>{t("quantity")}</span>
        <span className='font-medium'>4</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-gray-700'>{t("itemPrice")}</span>
        <span className='font-medium'>100KWD</span>
      </div>
      <div className='border-t border-dashed my-2'></div>
      <div className='flex justify-between'>
        <span className='font-medium'>{t("total")}</span>
        <span className='font-medium'>400KWD</span>
      </div>
    </div>
  )
}
