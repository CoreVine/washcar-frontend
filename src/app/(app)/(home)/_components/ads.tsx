"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"

export default function HomeAdsImages() {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("ads")}</p>
      <Image src='/defaults/ads.png' alt='Ads' width={1110} height={200} />
    </div>
  )
}
