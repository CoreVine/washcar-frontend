"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"

export default function MarketAdsImages() {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("ads")}</p>
      <Image src='/defaults/ads02.png' alt='Ads' width={1110} height={200} />
    </div>
  )
}
