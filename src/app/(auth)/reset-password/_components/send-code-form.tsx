"use client"

import AppLogo from "@/components/common/logo"

import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BackgroundBubbles } from "@/components/common/bubbles-effect"

export default function SendCodeForm() {
  const t = useTranslations()

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-blue-500 relative overflow-hidden'>
      <BackgroundBubbles />

      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10 mx-4'>
        <div className='text-center mb-6'>
          <div className='mx-auto w-fit mb-10'>
            <AppLogo width={200} height={200} />
          </div>
          <h2 className='text-lg font-medium mb-2'>{t("sendResetCode.title")}</h2>
          <p className='text-gray-500 text-sm'>{t("sendResetCode.subtitle")}</p>
        </div>

        <div className='space-y-2 mb-8'>
          <Label htmlFor='email'>{t("email")}</Label>
          <Input
            id='email'
            type='email'
            placeholder='example@domain.com'
            className='bg-gray-100 pr-10'
          />
        </div>

        <Button
          type='submit'
          className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'
        >
          {t("verifyEmail")}
        </Button>
      </div>
    </div>
  )
}
