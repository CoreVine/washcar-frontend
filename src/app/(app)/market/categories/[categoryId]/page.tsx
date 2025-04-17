import { AppSearch } from "@/components/common/search"
import { CategoryProductsList } from "../_components/category-products-list"

import SubCategoriesList from "../_components/sub-categories-list"

type Props = {
  params: Promise<{ categoryId: string }>
}

export default async function CategoryIdProducts({ params }: Props) {
  const { categoryId } = await params

  return (
    <div className='my-10 space-y-8'>
      <AppSearch />
      <SubCategoriesList id={+categoryId} />
      <CategoryProductsList id={+categoryId} />
    </div>
  )
}
