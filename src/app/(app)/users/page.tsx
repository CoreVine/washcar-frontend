import { SimplePagination } from "@/components/common/simple-pagination"
import { SingleUserCard } from "./_components/single-user"
import { TSearchParams } from "@/types/default"
import { NoDataLabel } from "@/components/common/no-data-label"
import { AppSearch } from "@/components/common/search"
import { Settings } from "lucide-react"

import { getPaginatedUsers } from "@/actions/users"
import { getTranslations } from "next-intl/server"

type Props = {
  searchParams: Promise<TSearchParams>
}

export default async function UsersListPage({ searchParams }: Props) {
  const t = await getTranslations()
  const sp = await searchParams
  const users = await getPaginatedUsers(sp)

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <AppSearch />
      <div className='my-6 flex items-center justify-between'>
        <h1 className='text-xl text-main-black'>{t("users")}</h1>
        <Settings />
      </div>

      {users?.data?.length === 0 ? (
        <NoDataLabel />
      ) : (
        <section>
          <div className='divide-y'>
            {users?.data?.map((user) => (
              <SingleUserCard key={user.user_id} user={user} />
            ))}
          </div>
          <SimplePagination hasNextPage={!!users.nextPage} hasPrevPage={!!users?.lastPage} />
        </section>
      )}
    </div>
  )
}
