"use server"

import { ApiError, PaginatedData, TSearchParams } from "@/types/default"
import { Product } from "@/types/models"

import { deleteRequest, getRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { getToken } from "./auth"
import { build } from "search-params"

export async function getProducts(params: TSearchParams = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Product>>(`/products?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching products:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch products")
  }
}

export async function getProduct(id: number) {
  try {
    const res = await getRequest<Product>(`/products/${id}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch product")
  }
}

export async function deleteProduct(id: number) {
  try {
    const token = await getToken()
    const res = await deleteRequest<Product>(`/products/${id}`, loadDefaultHeaders(token))
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching product:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch product")
  }
}
