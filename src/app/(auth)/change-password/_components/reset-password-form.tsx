"use client"

import AppLogo from "@/components/common/logo"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { BackgroundBubbles } from "@/components/common/bubbles-effect"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordForm() {
  const t = useTranslations()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-blue-500 relative overflow-hidden'>
      <BackgroundBubbles />

      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10 mx-4'>
        <div className='text-center mb-6'>
          <div className='mx-auto w-fit mb-10'>
            <AppLogo width={200} height={200} />
          </div>
          <h2 className='text-lg font-medium mb-2'>{t("resetPasswordPage.title")}</h2>
          <p className='text-gray-500 text-sm'>{t("resetPasswordPage.subtitle")}</p>
        </div>

        <form className='space-y-5'>
          <div className='space-y-2'>
            <Label htmlFor='password'>{t("newPassword")}</Label>
            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? "text" : "password"}
                placeholder='••••••••'
                className='bg-gray-100 pr-10'
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>{t("confirmPassword")}</Label>
            <Input
              id='password'
              type={showPassword ? "text" : "password"}
              placeholder='••••••••'
              className='bg-gray-100 pr-10'
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'
          >
            {t("updatePassword")}
          </Button>
        </form>
      </div>
    </div>
  )
}
