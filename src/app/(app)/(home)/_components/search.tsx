"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"
import { useTranslations } from "next-intl"

export default function HomeSearch() {
  const t = useTranslations()

  return (
    <div className='relative max-w-4xl mx-auto px-4'>
      <SearchIcon
        className='absolute xl:left-8 left-6 top-1/2 -translate-y-1/2 text-gray-500'
        size={17}
      />
      <Input placeholder={t("search")} className='rounded-2xl xl:pl-10 pl-8 py-4' />
    </div>
  )
}
