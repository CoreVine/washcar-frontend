import { Skeleton } from "@/components/ui/skeleton"

export const ProductsLoadingState = ({ number = 10 }: { number?: number }) => {
  return (
    <section className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4'>
      {Array.from({ length: number }).map((_, index) => (
        <Skeleton key={`loading-card-product-${index}`} className='w-full h-52 rounded-md' />
      ))}
    </section>
  )
}
