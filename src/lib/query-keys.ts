import { TSearchParams } from "@/types/default"

const QueryKeys = {
  ads: {
    index: ["ads"],
    single: (id: number) => ["ads", id]
  },
  categories: {
    index: ["categories"],
    single: (id: number) => ["categories", id],
    singleProducts: (id: number) => ["categories", id, "products"],
    singleSubCategories: (id: number) => ["categories", id, "subcategories"]
  },
  products: {
    index: (params: TSearchParams) => ["products", params],
    single: (id: number) => ["products", id]
  },
  brands: {
    index: (params: TSearchParams) => ["brands", params],
    single: (id: number) => ["brands", id]
  }
}

export default QueryKeys
