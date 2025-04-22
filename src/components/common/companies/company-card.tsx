"use client"

import routes from "@/lib/route"
import { Company } from "@/types/models"
import { Star } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

export function CompanyCard({ company, url }: { url?: string; company: Company }) {
  return (
    <div className='flex border-b justify-between border-blue-100 pb-4 pt-2 gap-4'>
      <div className='mr-4 flex-shrink-0 flex gap-4 items-center'>
        <Link href={url ? url : routes.companyCarWash(company.company_id)} className='relative h-20 w-20 overflow-hidden rounded border border-gray-200'>
          <Image src={company?.logo_url ?? "/defaults/nissan.png"} alt='Car wash equipment' className='h-auto w-full' width={100} height={100} />
        </Link>

        <Link href={url ? url : routes.companyCarWash(company.company_id)} className='text-lg hover:text-underline'>
          {company.company_name}
        </Link>
      </div>

      <div className='flex flex-col space-y-4 items-end'>
        <p className='text-gray-500 text-sm'>{company.location}</p>

        <div className='flex gap-3 flex-row-reverse'>
          {[...Array(5)].map((_, i) => (
            <Star key={`star-${i}`} size={24} className={i < company.total_rating ? "fill-blue-500 text-blue-500" : "fill-blue-100 text-light-blue"} />
          ))}
        </div>
      </div>
    </div>
  )
}
