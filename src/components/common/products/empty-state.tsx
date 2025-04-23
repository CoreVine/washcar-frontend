"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package } from "lucide-react"

import { useTranslations } from "next-intl"

export function EmptyProductState() {
  const t = useTranslations()

  return (
    <Card className='w-full max-w-3xl mx-auto'>
      <CardHeader className='text-center pb-4'>
        <div className='w-12 h-12 bg-muted rounded-full mx-auto flex items-center justify-center mb-4'>
          <Package className='h-6 w-6 text-muted-foreground' />
        </div>
        <CardTitle className='text-xl'>{t("noItemsFound")}</CardTitle>
        <CardDescription>{t("invalidItems")}</CardDescription>
      </CardHeader>
    </Card>
  )
}
