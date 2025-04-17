import { WashCarTypeCartItem } from "@/store/features/cart/wash-car"
import { WashCarType } from "@/types/models"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Props = {
  handlePrev: () => void
  handleNext: () => void
  currentIndex: number
  selectedWashType: WashCarType | undefined
  washTypesLength: number
}

export const CarWashSwitcher = ({ handlePrev, handleNext, currentIndex, selectedWashType, washTypesLength }: Props) => {
  return (
    <div className='flex items-center'>
      <button onClick={handlePrev} disabled={currentIndex === 0} className={`rounded-full cursor-pointer p-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}>
        <ChevronLeft size={20} />
      </button>

      <span className='mx-2 font-medium'>{selectedWashType?.name}</span>

      <button onClick={handleNext} disabled={currentIndex === washTypesLength - 1} className={`rounded-full cursor-pointer p-1 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}>
        <ChevronRight size={20} />
      </button>
    </div>
  )
}
