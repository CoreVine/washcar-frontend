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
    index: (params: Record<string, string>) => ["products", params],
    single: (id: number) => ["products", id]
  },
  brands: {
    index: (params: Record<string, string>) => ["brands", params],
    single: (id: number) => ["brands", id]
  }
}

export default QueryKeys
