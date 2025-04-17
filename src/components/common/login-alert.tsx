"use client"

import Link from "next/link"

import { useTranslations } from "next-intl"

type Props = {
  message?: string
}

export const LoginAlert = ({ message = "loginAlertMessage" }: Props) => {
  const t = useTranslations()

  return (
    <div className='bg-main-gray shadow-sm p-2 px-4 rounded-md border flex gap-2'>
      {t(message)}
      <Link href='/login' className='text-blue-500'>
        {t("clickHereToLogin")}
      </Link>
    </div>
  )
}
