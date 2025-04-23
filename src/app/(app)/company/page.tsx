import CompanyCard from "../services/_components/company-card"

import { getCompanies } from "@/actions/companies"
import { getTranslations } from "next-intl/server"
import { getUser } from "@/actions/auth"
import { notFound } from "next/navigation"

import { Settings2 } from "lucide-react"
import { AppSearch } from "@/components/common/search"
import { SimplePagination } from "@/components/common/simple-pagination"
import { TSearchParams } from "@/types/default"
import { LinkBtn } from "@/components/common/link-button"
import routes from "@/lib/route"

type Props = {
  searchParams: Promise<TSearchParams>
}

export const generateMetadata = async () => {
  const t = await getTranslations()
  return {
    title: t("services"),
    description: t("services")
  }
}

export default async function CarWashPage({ searchParams }: Props) {
  const user = await getUser()
  const sp = await searchParams
  const t = await getTranslations()

  if (!user?.employeeData) return notFound()

  const companies = await getCompanies(sp)

  return (
    <div className='container mx-auto px-4 py-8'>
      <AppSearch />

      <div className='my-6 flex items-center justify-between'>
        <h1 className='text-xl text-main-black'>{t("company")}</h1>
        <LinkBtn variant='outline' href={routes.pendingCompanies}>
          {t("viewPendingCompanies")}
        </LinkBtn>
      </div>

      <div className='grid grid-cols-1 gap-20 md:grid-cols-2'>
        {companies.data.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>

      <SimplePagination hasNextPage={!!companies.nextPage} className='mt-10' />
    </div>
  )
}
