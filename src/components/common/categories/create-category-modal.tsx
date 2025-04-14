"use client"

import Image from "next/image"

import { useTranslations } from "next-intl"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CameraIcon, PlusIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "../loading-button"

export const CreateCategoryModal = () => {
  const t = useTranslations()

  const [file, setFile] = useState<File | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const [imageUrl, setImageUrl] = useState<string>("/defaults/user.jpeg")
  const [name, setName] = useState<string>("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    const url = selectedFile ? URL.createObjectURL(selectedFile) : null
    setFile(selectedFile)
    setImageUrl(url ?? "/defaults/user.jpeg")
  }

  const mutation = useMutation({})

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='h-full w-full rounded-2xl border-main-black border-dashed' variant='outline'>
          <PlusIcon size={36} className='text-main-black opacity-60 size-10' />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <div className='space-y-6'>
          <div className='relative flex items-center justify-center w-fit mx-auto'>
            <Image src={imageUrl} alt='Image' width={200} height={200} className='rounded-full size-44 object-cover' />

            <div className='size-7 cursor-pointer bg-main-gray text-main-black rounded-full flex items-center justify-center absolute right-0 bottom-0 z-10'>
              <CameraIcon />
              <Input type='file' className='opacity-0 absolute w-full h-full z-20' id='file' accept='image/*' onChange={handleFileChange} />
            </div>
          </div>

          <div className='space-y-2'>
            <Label>{t("categoryName")}</Label>
            <Input className='bg-transparent' onChange={(e) => setName(e.target.value)} type='text' placeholder={t("categoryName")} />
          </div>

          <Separator />

          <LoadingButton loading={mutation.isPending} className='rounded-full w-full' size='lg'>
            {t("create")}
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
