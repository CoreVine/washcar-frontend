import ServicesSearch from "../_components/search"
import CompanyCard from "../_components/company-card"

import { Settings2 } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { getCompanies } from "@/actions/companies"
import { SimplePagination } from "@/components/common/simple-pagination"

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("services"),
    description: t("services")
  }
}

type Props = {
  searchParams: Promise<Record<string, string>>
}

export default async function CarWashPage({ searchParams }: Props) {
  const sp = await searchParams
  const companies = await getCompanies(sp)

  return (
    <div className='container mx-auto px-4 py-8'>
      <ServicesSearch />

      <div className='my-6 flex items-center justify-between'>
        <h1 className='text-xl text-main-black'>Car wash</h1>
        <Settings2 />
      </div>

      <div className='grid grid-cols-1 gap-20 md:grid-cols-2'>
        {companies.data.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>

      <SimplePagination 
        hasNextPage={!!companies.nextPage} 
        className='mt-10' 
      />
    </div>
  )
}
