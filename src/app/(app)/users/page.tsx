import { NoDataLabel } from "@/components/common/no-data-label"
import { AppSearch } from "@/components/common/search"
import { Settings } from "lucide-react"
import { SingleUserCard } from "./_components/single-user"
import { SimplePagination } from "@/components/common/simple-pagination"

export default function UsersListPage() {
  const users = Array.from({ length: 20 }, (_, i) => ({
    id: 1,
    name: "John Doe",
    image: "/defaults/user.jpeg"
  }))

  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <AppSearch />
      <div className='my-6 flex items-center justify-between'>
        <h1 className='text-xl text-main-black'>Users</h1>
        <Settings />
      </div>

      {users?.length === 0 ? (
        <NoDataLabel />
      ) : (
        <section>
          <div className='divide-y'>
            {users?.map((user) => (
              <SingleUserCard key={user.id} user={user} />
            ))}
          </div>
          <SimplePagination />
        </section>
      )}
    </div>
  )
}
