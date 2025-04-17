"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { CarouselItem } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CameraIcon, Minus, Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { createCategoryAction } from "@/actions/categories"
import { toast } from "react-toastify"
import { LoadingButton } from "../loading-button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductSchema } from "@/schema/products"
import { Form } from "@/components/ui/form"
import { InputField } from "../form/input-field"

type Props = {
  trigger?: React.ReactNode
  asChild?: boolean
}

export const CreateProductModal = ({ trigger, asChild }: Props) => {
  const t = useTranslations()

  const [fileUrl, setFileUrl] = useState("/defaults/user.jpeg")
  const [file, setFile] = useState<File | undefined>(undefined)

  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      stock: 1,
      subCategoriesIds: []
    }
  })

  const createMutation = useMutation({
    mutationFn: (data: FormData) => createCategoryAction(data),
    onSuccess: () => {
      toast.success(t("categoryCreated"))
      setFileUrl("/defaults/user.jpeg")
      setFile(undefined)
      setOpen(false)
    },
    onError: (error: any) => {
      toast.error(t(error?.message || "categoryCreateError"))
    }
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile)
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      setFileUrl(url)
    }
  }

  const handleSubmit = async () => {}

  const defaultTrigger = trigger ? (
    trigger
  ) : (
    <Button variant='outline' size='icon' className='w-full h-full rounded-full flex items-center justify-center size-6 bg-main-gray'>
      <Plus className='size-4' />
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{defaultTrigger}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8'>
            <div className='flex w-fit mx-auto justify-center relative cursor-pointer'>
              <Image src={fileUrl} alt='' className='size-44 object-cover rounded-full' width={500} height={500} />
              <input onChange={handleFileChange} className='opacity-0 absolute w-full h-full' type='file' />
              <div className='size-6 rounded-full flex items-center justify-center bg-gray-200 absolute bottom-0 right-6'>
                <CameraIcon size={14} />
              </div>
            </div>

            <div className='space-y-6'>
              <InputField label={t("name")} name='name' control={form.control} />
              <InputField label={t("price")} name='name' control={form.control} />

              <div className='flex justify-between items-center'>
                <p>{t("stock")}</p>
                <div className='flex gap-2 items-center'>
                  <Button icon={Plus} variant='outline' size='icon' className='rounded-full flex items-center justify-center size-6 bg-main-gray' />
                  <span>{form.getValues("stock")}</span>
                  <Button icon={Minus} variant='outline' size='icon' className='rounded-full flex items-center justify-center size-6 bg-main-gray' />
                </div>
              </div>
              <InputField label={t("description")} name='description' control={form.control} />
            </div>

            <div className='space-y-4'>
              <LoadingButton loading={createMutation.isPending} onClick={handleSubmit} className='rounded-4xl w-full py-6'>
                {t("add")}
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
