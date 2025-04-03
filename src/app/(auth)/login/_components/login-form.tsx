"use client"

import Link from "next/link"
import AppLogo from "@/components/common/logo"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import { BackgroundBubbles } from "@/components/common/bubbles-effect"
import { useLogin } from "@/hooks/auth/use-login"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/schema/auth"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { InputField } from "@/components/common/form/input-field"
import { LoadingButton } from "@/components/common/loading-button"

export default function LoginForm() {
  const t = useTranslations()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(LoginSchema)
  })
  const mutation = useLogin()

  const handleLogin = () => {
    mutation.mutate({
      data: form.getValues()
    })
  }

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

        <Form {...form}>
          <form className='space-y-5' onSubmit={form.handleSubmit(handleLogin)}>
            <InputField name='email' label={t("email")} type='email' placeholder='Mubarak.Al-Shamlan5547@gmail.com' control={form.control} />

            <div>
              <div className='relative'>
                <InputField name='password' label={t("password")} control={form.control} type={showPassword ? "text" : "password"} placeholder='••••••••' className='bg-gray-100 pr-10' />
                <button type='button' className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className='flex justify-end'>
                <Link href='/forgot-password' className='text-blue-500 hover:underline font-semibold text-sm w-fit'>
                  {t("forgotPassword")}
                </Link>
              </div>
            </div>

            <LoadingButton type='submit' className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'>
              {t("login")}
            </LoadingButton>
          </form>
        </Form>

        <div className='text-center mt-6'>
          <p className='text-sm flex gap-2 justify-center'>
            {t("loginPage.dontHaveAnAccount")}
            <Link href='/register' className='text-blue-500 hover:underline'>
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
