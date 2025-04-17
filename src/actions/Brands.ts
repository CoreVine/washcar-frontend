"use server"

import { getRequest } from "@/lib/axios"
import { ApiError, PaginatedData } from "@/types/default"
import { Brand } from "@/types/models"
import { build } from "search-params"

export async function getBrands(params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Brand>>(`/brands?${sp}`)
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching brands:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch brands")
  }
}

export async function getPaginatedBrands() {
  try {
    const res = await getRequest<PaginatedData<Brand>>("/brands")
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching brands:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch brands")
  }
}
