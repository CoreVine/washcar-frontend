"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useTranslations } from "next-intl"

export default function RentCarDetailsRightSide() {
  const t = useTranslations()

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex xl:flex-row flex-col xl:items-center gap-2'>
            <section>
              <p className='text-gray-600'>{t("dateFrom")}</p>
              <div className='flex'>
                <input
                  defaultValue={20}
                  type='text'
                  className='w-16 h-12 bg-gray-100 rounded-l-lg text-center'
                />
                <Select defaultValue='Feb'>
                  <SelectTrigger className='w-20 min-h-12 border-0 bg-gray-100 rounded-none'>
                    <SelectValue placeholder={t("month")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Jan'>Jan</SelectItem>
                    <SelectItem value='Feb'>Feb</SelectItem>
                    <SelectItem value='Mar'>Mar</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  defaultValue={2025}
                  type='text'
                  className='w-20 h-12 bg-gray-100 rounded-r-lg text-center'
                />
              </div>
            </section>

            <ArrowRight className='h-5 w-5 mt-4 text-gray-400 mx-2 hidden xl:block' />

            <section>
              <p className='text-gray-600'>{t("dateTo")}</p>
              <div className='flex'>
                <input
                  defaultValue={20}
                  type='text'
                  className='w-16 h-12 bg-gray-100 rounded-l-lg text-center'
                />
                <Select defaultValue='Feb'>
                  <SelectTrigger className='w-20 min-h-12 border-0 bg-gray-100 rounded-none'>
                    <SelectValue placeholder={t("month")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Jan'>Jan</SelectItem>
                    <SelectItem value='Feb'>Feb</SelectItem>
                    <SelectItem value='Mar'>Mar</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  defaultValue={2025}
                  type='text'
                  className='w-20 h-12 bg-gray-100 rounded-r-lg text-center'
                />
              </div>
            </section>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("rentalDays")}</p>
          <p className='font-medium'>3d</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("dayPrice")}</p>
          <p className='font-medium'>250KWD</p>
        </div>

        <div className='border-t border-dashed border-t-main-gray pt-4'></div>

        <div className='flex justify-between items-center'>
          <p className='font-medium'>{t("total")}</p>
          <p className='font-medium'>750KWD</p>
        </div>
      </div>

      <Button className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
        {t("addToCart")}
      </Button>
    </div>
  )
}
