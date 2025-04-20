import { Skeleton } from "@/components/ui/skeleton"

export const CartRightSideLoadingState = () => {
  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <Skeleton className='w-32 h-4' />
          <Skeleton className='w-32 h-4' />
        </div>

        <div className='flex justify-between items-center'>
          <Skeleton className='w-32 h-4' />
          <Skeleton className='w-32 h-4' />
        </div>

        <div className='flex justify-between items-center'>
          <Skeleton className='w-32 h-4' />
          <Skeleton className='w-32 h-4' />
        </div>

        <Skeleton className='w-full h-10 rounded-full' />
      </div>
    </div>
  )
}
