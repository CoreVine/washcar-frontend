"use client"

import routes from "@/lib/route"

import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { deleteProduct } from "@/actions/products"
import { toast } from "react-toastify"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoadingButton } from "../loading-button"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

type Props = {
  trigger?: React.ReactNode
  asChild?: boolean
  productId: number
}

export const DeleteProductModal = ({ productId, trigger, asChild = true }: Props) => {
  const [open, setOpen] = useState(false)

  const router = useRouter()
  const t = useTranslations()

  const delMutation = useMutation({
    mutationFn: (productId: number) => deleteProduct(productId),
    onSuccess: () => {
      toast.success(t("productDeleted"))
      setOpen(false)
      router.push(routes.market)
    },
    onError: (error: any) => {
      toast.error(error?.message)
    }
  })

  const handleSubmit = () => {
    delMutation.mutate(productId)
  }

  const defaultTrigger = trigger ? (
    trigger
  ) : (
    <Button variant='outline-destructive' size='icon' className='w-full h-full rounded-full flex items-center justify-center size-7 bg-main-gray'>
      <Trash className='size-4' />
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("areYourSureThatYouWantToDeleteThisProduct")}</DialogTitle>
          <DialogDescription>{t("thisActionIsNotReversible")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>{t("close")}</Button>
          </DialogClose>
          <LoadingButton loading={delMutation.isPending} onClick={handleSubmit} variant='destructive'>
            {t("submit")}
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
