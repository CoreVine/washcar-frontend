"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import Link from "next/link"
import AppLogo from "@/components/common/logo"
import BackgroundBubbles from "./bubbles-effect"
import { useTranslations } from "next-intl"

export default function RegisterForm() {
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
          <h2 className='text-lg font-medium mb-2'>{t("registerPage.title")}</h2>
          <p className='text-gray-500 text-sm'>{t("registerPage.subtitle")}</p>
        </div>

        <form className='space-y-5'>
          <div className='space-y-2'>
            <Label htmlFor='name'>{t("name")}</Label>
            <Input id='name' placeholder='Mubarak Al-Shamlan' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>{t("email")}</Label>
            <Input id='email' type='email' placeholder='Mubarak.Al-Shamlan5547@gmail.com' />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>{t("password")}</Label>
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

          <Button
            type='submit'
            className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'
          >
            {t("register")}
          </Button>
        </form>

        <div className='text-center mt-6'>
          <p className='text-sm flex gap-2 justify-center'>
            {t("registerPage.alreadyHaveAnAccount")}
            <Link href='/login' className='text-blue-500 hover:underline'>
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
