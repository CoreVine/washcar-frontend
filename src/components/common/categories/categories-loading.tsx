import { Skeleton } from "../../ui/skeleton"

export const CategoriesLoadingState = () => {
  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      {Array.from({ length: 12 }).map((_, i) => (
        <Skeleton key={i} className='size-20 rounded-xl' />
      ))}
    </div>
  )
}
