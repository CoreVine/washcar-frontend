"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"
import Link from "next/link"

export default function HomeServicesList() {
  const t = useTranslations()

  return (
    <div className='max-w-6xl mx-auto space-y-2 px-4'>
      <p className='text-lg'>{t("services")}</p>
      <section className='flex flex-wrap xl:gap-14 gap-4 justify-center'>
        <Link href='' className='space-y-2 text-center'>
          <div className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
            <Image src='/defaults/services/car.png' alt='Nissan' width={60} height={60} />
          </div>
          <p>{t("carWash")}</p>
        </Link>
        <Link href='' className='space-y-2 text-center'>
          <div className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
            <Image src='/defaults/services/rent.png' alt='Nissan' width={60} height={60} />
          </div>
          <p>{t("rentCar")}</p>
        </Link>
        <Link href='' className='space-y-2 text-center'>
          <div className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'>
            <Image src='/defaults/services/buy.png' alt='Nissan' width={60} height={60} />
          </div>
          <p>{t("buyACar")}</p>
        </Link>
      </section>
    </div>
  )
}
