"use client"

import Link from "next/link"
import AppLogo from "@/components/common/logo"

import { useTranslations } from "next-intl"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { BackgroundBubbles } from "@/components/common/bubbles-effect"
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp"

import CooldownTimer from "@/components/common/cooldown-timer"
import { useMutation } from "@tanstack/react-query"
import { verifyPasswordTokenAction } from "@/actions/auth"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { LoadingButton } from "@/components/common/loading-button"
import routes from "@/lib/route"

export default function VerifyCodeForm() {
  const router = useRouter()
  const t = useTranslations()

  const [code, setCode] = useState("")
  const [timeLeft, setTimeLeft] = useState(5 * 60)

  const mutation = useMutation({
    mutationFn: (code: string) => verifyPasswordTokenAction(code),
    onSuccess: (data) => {
      toast.success(t("verified"))
      router.push(routes.auth.changePassword)
    },
    onError: (data) => {
      toast.error(data?.message)
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate(code)
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-blue-500 relative overflow-hidden'>
      <BackgroundBubbles />

      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10 mx-4'>
        <div className='text-center mb-6'>
          <div className='mx-auto w-fit mb-10'>
            <AppLogo width={200} height={200} />
          </div>
          <h2 className='text-lg font-medium mb-2'>{t("verifyEmailPage.title")}</h2>
          <p className='text-gray-500 text-sm'>{t("verifyEmailPage.subtitle")}</p>
        </div>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2 flex justify-center'>
            <InputOTP onChange={(value) => setCode(value)} maxLength={6}>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTP>
          </div>

          {/* <CooldownTimer cooldown={60} onCooldownEnd={() => setTimeLeft(60)} /> */}

          <div className='flex justify-center gap-2'>
            <p>{t("verifyEmailPage.didntGetTheCode")}</p>
            <Link href={`/auth/reset-password`} className='text-main font-semibold underline'>
              {t("verifyEmailPage.resendTheCode")}
            </Link>
          </div>

          <LoadingButton loading={mutation.isPending} type='submit' className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'>
            {t("verifyEmail")}
          </LoadingButton>
        </form>
      </div>
    </div>
  )
}
