"use client"

import { useUser } from "@/hooks/auth/use-user"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { KeyRound, Trash2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function UserProfilePage() {
  const user = useUser()

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='flex flex-col items-center space-y-4 pb-0'>
          <div className='relative'>
            <Avatar className='w-24 h-24'>
              <AvatarImage src={user?.user.profile_picture_url || "/placeholder.svg"} alt='Profile picture' />
              <AvatarFallback>{user?.user.name[0]}</AvatarFallback>
            </Avatar>
            <button className='absolute bottom-0 right-0 bg-muted rounded-full p-1.5 border border-border'>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12 15.5H12.01M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V6.2C19 5.0799 19 4.51984 18.782 4.09202C18.5903 3.71569 18.2843 3.40973 17.908 3.21799C17.4802 3 16.9201 3 15.8 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </CardHeader>

        <div className='flex justify-center gap-6 mt-6 px-6'>
          <Button variant='outline' size='sm' className='flex items-center gap-2'>
            <KeyRound className='h-4 w-4' />
            Reset Password
          </Button>
          <Button variant='outline' size='sm' className='flex items-center gap-2 text-destructive'>
            <Trash2 className='h-4 w-4' />
            Delete Account
          </Button>
        </div>

        <Separator className='my-6' />

        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' defaultValue={user?.user.username} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' defaultValue={user?.user.email} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input id='phone' type='tel' defaultValue={user?.user.phone_number} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address'>Address</Label>
            <Input id='address' defaultValue={user?.user.address} />
          </div>
        </CardContent>

        <CardFooter>
          <Button className='w-full bg-blue-500 hover:bg-blue-600'>Save</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
