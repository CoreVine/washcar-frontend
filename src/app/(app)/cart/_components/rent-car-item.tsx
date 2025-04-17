import { removeRentCarFromCart } from "@/actions/cart"
import { LoadingButton } from "@/components/common/loading-button"
import { Car } from "@/types/models"
import { useMutation } from "@tanstack/react-query"
import { XIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

type Props = {
  car: Car
  rentOrderId: number
}

export const RentCarItem = ({ car, rentOrderId }: Props) => {
  const [isRemoved, setRemoved] = useState(false)

  const removeMutation = useMutation({
    mutationFn: () => removeRentCarFromCart(rentOrderId, car.company_id),
    onSuccess: () => {
      toast.success("Car removed from cart")
      setRemoved(true)
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong")
    }
  })

  const handleRemove = () => {
    removeMutation.mutate()
  }

  if (isRemoved) return null

  return (
    <div className='flex items-center gap-4 py-4 relative'>
      <div className='bg-gray-100 p-2 rounded-lg'>
        <Image src='/defaults/cars/01.png' alt='Nissan NV200' width={80} height={80} className='object-contain size-20 rounded-md' />
      </div>

      <div className='flex-1'>
        <h2 className='text-lg font-medium'>{car?.model}</h2>
      </div>

      <div className='text-right'>
        <p className='font-medium'>{car.price}KWD</p>
      </div>

      <LoadingButton loading={removeMutation.isPending} onClick={handleRemove} icon={XIcon} variant='outline' className='bg-main-gray text-main-black rounded-full size-7 absolute top-2 right-0 hover:bg-gray-100 hover:text-red-500 cursor-pointer' />
    </div>
  )
}
