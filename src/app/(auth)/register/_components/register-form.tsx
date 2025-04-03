"use client"

import Link from "next/link"
import AppLogo from "@/components/common/logo"

import routes from "@/lib/route"

import { useTranslations } from "next-intl"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

import { registerAction } from "@/actions/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"

import { RegisterData, TAccountType } from "@/types/default"
import { BackgroundBubbles } from "@/components/common/bubbles-effect"
import { RegisterSchema } from "@/schema/auth"
import { LoadingButton } from "@/components/common/loading-button"
import { Eye, EyeOff } from "lucide-react"
import { InputField } from "@/components/common/form/input-field"
import { Form } from "@/components/ui/form"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()
  const t = useTranslations()

  const mutation = useMutation({
    mutationFn: ({ data, accountType }: { data: RegisterData; accountType: TAccountType }) => registerAction(data, accountType),
    onSuccess: (data) => {
      toast.success("Register successful")
      router.push(routes.myAccount)
    },
    onError: (error) => {
      toast.error(error?.message || "Register failed")
    }
  })

  const form = useForm({
    resolver: zodResolver(RegisterSchema)
  })

  const handleRegister = () => {
    mutation.mutate({
      data: form.getValues(),
      accountType: "user"
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
          <form className='space-y-5' onSubmit={form.handleSubmit(handleRegister)}>
            <InputField name='username' label={t("username")} placeholder='johndoe' control={form.control} />
            <InputField name='name' label={t("name")} placeholder='Mubarak Al-Shamlan' control={form.control} />
            <InputField name='email' label={t("email")} placeholder='example@domain.com' control={form.control} />
            <InputField name='phone_number' label={t("phoneNumber")} placeholder='+9912245212' control={form.control} />
            <InputField name='address' label={t("address")} placeholder='Germany, Frankfurt' control={form.control} />

            <div className='relative'>
              <InputField name='password' label={t("password")} placeholder='***********' control={form.control} type={showPassword ? "text" : "password"} />
              <button type='button' className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <LoadingButton loading={mutation.isPending} type='submit' className='w-full bg-main hover:bg-blue-600 text-white rounded-3xl py-6'>
              {t("register")}
            </LoadingButton>
          </form>
        </Form>

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
