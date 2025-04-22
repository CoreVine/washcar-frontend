import routes from "@/lib/route"

import { ChevronLeft } from "lucide-react"
import { LinkBtn } from "@/components/common/link-button"
import { Company } from "@/types/models"
import { CompanyCard } from "@/components/common/companies/company-card"
import { DeleteCompanyModal } from "@/components/common/companies/delete-modal"

type Props = {
  company: Company
}

export const CompanyLeftDetails = ({ company }: Props) => {
  return (
    <div className='border-r border-gray-200 p-6 md:w-1/2'>
      <div className='flex items-center justify-between'>
        <LinkBtn href={routes.services("car-wash")} variant='outline' className='mb-4 rounded-full size-10 hover:bg-gray-100'>
          <ChevronLeft size={20} />
        </LinkBtn>
        <DeleteCompanyModal />
      </div>

      <CompanyCard url={`/company/${company.company_id}`} company={company} />

      <div className='rounded-xl bg-main-gray p-4 text-sm text-gray-600 mt-4'>
        <p>{company.about}</p>
      </div>
    </div>
  )
}
