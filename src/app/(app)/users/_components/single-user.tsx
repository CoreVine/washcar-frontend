import Image from "next/image"
import { DeleteUserModal } from "./delete-modal"
import Link from "next/link"

type Props = {
  user: any
}

export const SingleUserCard = ({ user }: Props) => {
  return (
    <div className='flex justify-between items-center py-2'>
      <div className='flex items-center gap-2'>
        <Image src={user.image || "/defaults/user.jpeg"} alt='user' width={50} height={50} className='rounded-full size-20 object-cover' />
        <Link href={`/users/${user.id}`} className='text-main-black text-lg hover:underline hover:text-blue'>
          {user.name}
        </Link>
      </div>
      <DeleteUserModal />
    </div>
  )
}
