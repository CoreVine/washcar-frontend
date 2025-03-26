import Image from "next/image"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { DEFAULT_USER_IMAGE } from "@/lib/constants"

export default function NavbarUserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={DEFAULT_USER_IMAGE}
          width={40}
          height={40}
          alt='User Image'
          className='rounded-full size-14'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
