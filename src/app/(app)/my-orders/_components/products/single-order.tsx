import Image from "next/image"

type Props = {
  product: any
}

export const ProductOrderDetails = ({ product }: Props) => {
  return (
    <div className='flex items-center p-4 border-b'>
      <div className='flex-shrink-0 mx-4'>
        <div className='bg-main-gray p-2 rounded-lg'>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={60}
            height={60}
            className='object-contain'
          />
        </div>
      </div>
      <div className='flex-grow'>
        <h3 className='font-medium'>{product.title}</h3>
      </div>
      <div className='flex-shrink-0 flex flex-col gap-6'>
        <p className='text-xs text-gray-500'>{product.price}</p>
      </div>
    </div>
  )
}
