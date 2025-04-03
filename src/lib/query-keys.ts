const QueryKeys = {
  ads: {
    index: ["ads"],
    single: (id: number) => ["ads", id]
  },
  categories: {
    index: ["categories"],
    single: (id: number) => ["categories", id]
  },
  products: {
    index: (params: Record<string, string>) => ["products", params],
    single: (id: number) => ["products", id]
  }
}

export default QueryKeys
