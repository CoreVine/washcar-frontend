import routes from "@/lib/route"

import CompanyCard from "../../_components/company-card"

import { ChevronLeft } from "lucide-react"
import { LinkBtn } from "@/components/common/link-button"
import { Company } from "@/types/models"

type Props = {
  company: Company
}

export const CompanyLeftDetails = ({ company }: Props) => {
  return (
    <div className='border-r border-gray-200 p-6 md:w-1/2'>
      <LinkBtn href={routes.services("car-wash")} className='mb-4 rounded-full p-2 hover:bg-gray-100'>
        <ChevronLeft size={20} />
      </LinkBtn>

      <CompanyCard company={company} />

      <div className='rounded-xl bg-main-gray p-4 text-sm text-gray-600 mt-4'>
        <p>{company.about}</p>
      </div>
    </div>
  )
}
