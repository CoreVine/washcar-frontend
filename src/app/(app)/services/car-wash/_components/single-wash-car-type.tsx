import { WashCarTypeCartItem } from "@/store/features/cart/wash-car"
import { X } from "lucide-react"

type Props = {
  service: WashCarTypeCartItem
  handleRemoveFromServices: (id: number) => void
}

export const SingleCarWashType = ({ service, handleRemoveFromServices }: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <span>{service.name}</span>
      <div className='flex items-center gap-2'>
        <span>{service.unitPrice} KWD</span>
        <button onClick={() => handleRemoveFromServices(service.typeId)} className='rounded-full cursor-pointer p-1 hover:bg-main-gray'>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
