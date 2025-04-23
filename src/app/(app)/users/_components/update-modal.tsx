"use client"

import routes from "@/lib/route"

import { FormEvent, useState } from "react"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { deleteUserAction } from "@/actions/users"
import { toast } from "react-toastify"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { LoadingButton } from "@/components/common/loading-button"
import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "@/types/models"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { UpdateUserSchema } from "@/schema/auth"
import { Form } from "@/components/ui/form"

type Props = {
  user: User
  trigger?: React.ReactNode
  asChild?: boolean
}

type TMut = {
  userId: number
  reason: string
}

export const UpdateUserModal = ({ user, trigger, asChild = true }: Props) => {
  const openWith = trigger || <Button icon={Edit} variant='outline' className='rounded-full size-10' />

  const router = useRouter()
  const t = useTranslations()

  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address
    }
  })

  const mutation = useMutation({
    mutationFn: ({ userId, reason }: TMut) => deleteUserAction(userId, reason, true),
    onSuccess: () => {
      toast.success(t("userDeletedSuccessfully"))
      setOpen(false)
      router.push(routes.users)
    },
    onError: (error: Error) => {
      toast.error(error?.message || t("failedToDeleteUser"))
      setOpen(false)
    }
  })

  const handleSubmit = () => {}

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>{openWith}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("areYouSureThatYouWantToDeleteThisUser")}</AlertDialogTitle>
          <AlertDialogDescription>{t("thisActionIsNotReversibleOnceYouDeleteTheUserYouDeleteAllOfHisData")}</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2'>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant='outline'>{t("cancel")}</Button>
              </AlertDialogCancel>

              <LoadingButton loading={mutation.isPending} variant='outline-destructive'>
                {t("submit")}
              </LoadingButton>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
