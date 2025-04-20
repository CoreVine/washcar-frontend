import { WashCarType } from "@/types/models"

import routes from "@/lib/route"

import Link from "next/link"
import Image from "next/image"

type Props = {
  type: WashCarType
}

export const WashCarCard = ({ type }: Props) => {
  return (
    <div className='flex border-b justify-between border-blue-100 pb-4 pt-2 gap-4'>
      <div className='mr-4 flex-shrink-0 flex gap-4 items-center'>
        <Link href={routes.companyCarWash(type.company_id)} className='relative h-20 w-20 overflow-hidden rounded border border-gray-200'>
          <Image src={"/defaults/nissan.png"} alt='Car wash equipment' className='h-auto w-full' width={100} height={100} />
        </Link>

        <Link href={routes.companyCarWash(type.company_id)} className='text-lg hover:text-underline'>
          {type.name}
        </Link>
      </div>
    </div>
  )
}
