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
import { Trash } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  userId: number
  trigger?: React.ReactNode
  asChild?: boolean
}

type TMut = {
  userId: number
  reason: string
}

export const DeleteUserModal = ({ userId, trigger, asChild = true }: Props) => {
  const openWith = trigger || <Button icon={Trash} variant='outline-destructive' className='rounded-full size-10' />

  const router = useRouter()
  const t = useTranslations()

  const [reason, setReason] = useState<string>("")
  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: ({ userId, reason }: TMut) => deleteUserAction(userId, reason, true),
    onSuccess: () => {
      toast.success(t("userDeletedSuccessfully"))
      setOpen(false)
      setReason("")
      router.push(routes.users)
    },
    onError: (error: Error) => {
      toast.error(error?.message || t("failedToDeleteUser"))
      setOpen(false)
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate({
      userId,
      reason
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild={asChild}>{openWith}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("areYouSureThatYouWantToDeleteThisUser")}</AlertDialogTitle>
          <AlertDialogDescription>{t("thisActionIsNotReversibleOnceYouDeleteTheUserYouDeleteAllOfHisData")}</AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className='space-y-2'>
          <div className='space-y-2'>
            <Label>{t("reasonForDeletion")}</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder='Reason' />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant='outline'>{t("cancel")}</Button>
            </AlertDialogCancel>

            <LoadingButton loading={mutation.isPending} variant='outline-destructive'>
              {t("submit")}
            </LoadingButton>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
