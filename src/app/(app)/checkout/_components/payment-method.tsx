import { ChevronRight } from "lucide-react"

export default function CheckoutPaymentMethod() {
  return (
    <div className='bg-gray-100 rounded-lg p-3'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='bg-blue-500 text-white p-2 rounded-md w-10 h-10 flex items-center justify-center'>
            <span className='font-bold text-xl'>K</span>
          </div>
          <span>Knet</span>
        </div>
        <ChevronRight className='h-5 w-5 text-gray-400' />
      </div>
    </div>
  )
}
