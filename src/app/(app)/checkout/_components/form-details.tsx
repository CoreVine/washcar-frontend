"use client"

import { Label } from "@/components/ui/label"
import { months } from "@/lib/lists"
import { useTranslations } from "next-intl"

export default function CheckoutFormDetails() {
  const t = useTranslations()

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='cardNumber' className='block text-sm font-medium'>
          {t("cardNumber")}
        </Label>
        <div className='flex items-center bg-gray-100 rounded-lg p-3'>
          <input
            id='cardNumber'
            type='text'
            className='flex-grow bg-transparent border-none focus:outline-none'
            value='5534  2834  8857  5370'
            readOnly
          />
          <div className='flex space-x-1'>
            <div className='w-8 h-5 bg-red-500 rounded-full'></div>
            <div className='w-8 h-5 bg-yellow-500 rounded-full'></div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='expiry' className='block text-sm font-medium'>
            {t("expiryDate")}
          </Label>
          <div className='flex'>
            <div className='bg-gray-100 rounded-l-lg p-3 w-24'>
              <select
                id='expiryMonth'
                className='w-full bg-transparent border-none focus:outline-none text-gray-500'
                defaultValue='Jan'
              >
                {months.map((month) => (
                  <option key={month}>{month}</option>
                ))}
              </select>
            </div>
            <div className='bg-gray-100 rounded-r-lg p-3 w-24'>
              <input
                id='expiryYear'
                type='text'
                className='w-full bg-transparent border-none focus:outline-none'
                value='2025'
                readOnly
              />
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='cvv' className='block text-sm font-medium'>
            {t("cvv")}
          </Label>
          <div className='bg-gray-100 rounded-lg p-3'>
            <input
              id='cvv'
              type='password'
              className='w-full bg-transparent border-none focus:outline-none'
              value='•••'
              readOnly
            />
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='name' className='block text-sm font-medium'>
          {t("name")}
        </Label>
        <div className='bg-gray-100 rounded-lg p-3'>
          <input
            id='name'
            type='text'
            className='w-full bg-transparent border-none focus:outline-none'
            value='Mubarak Al-Shamlan'
            readOnly
          />
        </div>
      </div>
    </div>
  )
}
