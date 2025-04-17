"use client"

import Image from "next/image"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useAds } from "@/hooks/data/use-ads"

import { Skeleton } from "../ui/skeleton"

export const AdsList = () => {
  const t = useTranslations()

  const { ads, isAdsLoading } = useAds()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!ads?.data?.length) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ads.data.length - 1 ? 0 : prev + 1))
    }, 2000)

    return () => clearInterval(timer)
  }, [ads?.data])

  return (
    <div className='max-w-6xl mx-auto px-4 space-y-2'>
      <p className='text-lg'>{t("ads")}</p>

      <div className='relative h-96 w-full'>
        {isAdsLoading ? (
          <Skeleton className='h-96 w-full rounded-xl' />
        ) : (
          <div className='h-full w-full'>
            {ads?.data.map((ad, index) => (
              <div key={index} className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}>
                <Image
                  src={`/defaults/nissan.png`}
                  alt={`Ad ${index + 1}`}
                  width={1110}
                  height={384} // Matches h-96 (24rem = 384px)
                  className='w-full h-96 object-cover rounded-xl'
                />
              </div>
            ))}
          </div>
        )}

        {ads?.data && ads?.data?.length > 1 && (
          <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2'>
            {ads?.data.map((_, index) => (
              <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-gray-800 w-4" : "bg-gray-400 hover:bg-gray-500"}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
