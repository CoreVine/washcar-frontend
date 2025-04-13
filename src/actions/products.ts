"use server"

import { getRequest } from "@/lib/axios"
import { PaginatedData } from "@/types/default"
import { Product } from "@/types/models"

import { build } from "search-params"

export async function getProducts(params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Product>>(`/products?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    throw new Error("Failed to fetch products")
  }
}

export async function getProduct(id: number) {
  try {
    const res = await getRequest<{ data: Product }>(`/products/${id}`)
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    throw new Error("Failed to fetch product")
  }
}
