"use client"

import AppLogo from "@/components/common/logo"

import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { sendResetPasswordLinkAction } from "@/actions/auth"
import { toast } from "react-toastify"

import { BackgroundBubbles } from "@/components/common/bubbles-effect"
import { LoadingButton } from "@/components/common/loading-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import routes from "@/lib/route"

export default function SendCodeForm() {
  const router = useRouter()
  const t = useTranslations()

  const [email, setEmail] = useState("")

  const mutation = useMutation({
    mutationFn: (email: string) => sendResetPasswordLinkAction(email),
    onSuccess: () => {
      toast.success(t("passwordResetCodeSentSuccessfully"))
      router.push(routes.auth.verifyCode)
    },
    onError: (error: Error) => toast.error(error.message)
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(email)
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-blue-500 relative overflow-hidden'>
      <BackgroundBubbles />

      <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md z-10 mx-4'>
        <div className='text-center mb-6'>
          <div className='mx-auto w-fit mb-10'>
            <AppLogo width={200} height={200} />
          </div>
          <h2 className='text-lg font-medium mb-2'>{t("sendResetCode.title")}</h2>
          <p className='text-gray-500 text-sm'>{t("sendResetCode.subtitle")}</p>
        </div>

        <div className='space-y-2 mb-8'>
          <Label htmlFor='email'>{t("email")}</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type='email' placeholder='example@domain.com' className='bg-gray-100 pr-10' />
        </div>

        <LoadingButton loading={mutation.isPending} type='submit' className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'>
          {t("sendResetLink")}
        </LoadingButton>
      </form>
    </div>
  )
}
