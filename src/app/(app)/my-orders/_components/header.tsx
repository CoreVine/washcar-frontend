"use client"

import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"

type Props = {
  title: string
}

export const MyOrdersPageHeader = ({ title }: Props) => {
  const t = useTranslations()

  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='text-lg font-medium'>{t(title)}</h2>
      <Button variant='ghost' size='icon'>
        <SlidersHorizontal className='h-5 w-5' />
      </Button>
    </div>
  )
}
