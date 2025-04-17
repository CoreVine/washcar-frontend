"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { CarouselItem } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CameraIcon, Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { createCategoryAction } from "@/actions/categories"
import { toast } from "react-toastify"
import { LoadingButton } from "../loading-button"

type Props = {
  trigger?: React.ReactNode
  asChild?: boolean
}

export const CreateCatetoryModal = ({ trigger, asChild }: Props) => {
  const t = useTranslations()

  const [fileUrl, setFileUrl] = useState("/defaults/user.jpeg")
  const [file, setFile] = useState<File | undefined>(undefined)
  const [categoryName, setCategoryName] = useState("")
  const [open, setOpen] = useState(false)

  const createMutation = useMutation({
    mutationFn: (data: FormData) => createCategoryAction(data),
    onSuccess: () => {
      toast.success(t("categoryCreated"))
      setFileUrl("/defaults/user.jpeg")
      setFile(undefined)
      setCategoryName("")
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

  const handleSubmit = async () => {
    const formData = new FormData()
    if (!file) {
      toast.error(t("fileRequired"))
      return
    }
    if (!categoryName) {
      toast.error(t("nameRequired"))
      return
    }

    formData.append("icon", file)
    formData.append("category_name", categoryName)

    createMutation.mutate(formData)
  }

  const defaultTrigger = trigger ? (
    trigger
  ) : (
    <CarouselItem className='md:basis-1/12 lg:basis-1/12 basis-1/4 w-full h-full'>
      <Button variant='outline' className='w-full h-full flex items-center justify-center size-20'>
        <Plus className='size-6' />
      </Button>
    </CarouselItem>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{defaultTrigger}</DialogTrigger>
      <DialogContent className='space-y-4'>
        <div className='flex w-fit mx-auto justify-center relative cursor-pointer'>
          <Image src={fileUrl} alt='' className='size-44 object-cover rounded-full' width={500} height={500} />
          <input onChange={handleFileChange} className='opacity-0 absolute w-full h-full' type='file' />
          <div className='size-6 rounded-full flex items-center justify-center bg-gray-200 absolute bottom-0 right-6'>
            <CameraIcon size={14} />
          </div>
        </div>

        <div className='space-y-4'>
          <Input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder='Category Name' className='w-full' />
          <LoadingButton loading={createMutation.isPending} onClick={handleSubmit} className='rounded-4xl w-full py-6'>
            {t("add")}
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
