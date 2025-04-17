import { getCompanyWashTypes } from "@/actions/companies"
import { notFound } from "next/navigation"

import { CompanyRightDetails } from "../_components/company-right-details"
import { CompanyLeftDetails } from "../_components/company-left-details"
import { getCart } from "@/actions/cart"

type Props = {
  params: Promise<{
    companyId: string
  }>
}

export default async function CarWashDetail({ params }: Props) {
  const companyId = +(await params).companyId
  const company = await getCompanyWashTypes(companyId)

  if (!company) return notFound()

  return (
    <div className='mx-auto max-w-7xl px-4 my-10'>
      <div className='flex flex-col md:flex-row'>
        <CompanyLeftDetails company={company} />
        <CompanyRightDetails company={company} />
      </div>
    </div>
  )
}
