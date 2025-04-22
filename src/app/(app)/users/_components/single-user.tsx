import routes from "@/lib/route"

import Image from "next/image"
import Link from "next/link"

import { DeleteUserModal } from "./delete-modal"
import { User } from "@/types/models"

type Props = {
  user: User
}

export const SingleUserCard = ({ user }: Props) => {
  return (
    <div className='flex justify-between items-center py-2'>
      <div className='flex items-center gap-2'>
        <Image src={user?.profile_picture_url || "/defaults/user.jpeg"} alt='user' width={50} height={50} className='rounded-full size-20 object-cover' />
        <Link href={routes.viewUser(user.user_id)} className='text-main-black text-lg hover:underline hover:text-blue'>
          {user.name}
        </Link>
      </div>
      <DeleteUserModal userId={user.user_id} />
    </div>
  )
}
