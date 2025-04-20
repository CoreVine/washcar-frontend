"use server"

import { ApiError, PaginatedData } from "@/types/default"
import { Product } from "@/types/models"

import { deleteRequest, getRequest } from "@/lib/axios"
import { build } from "search-params"
import { getToken } from "./auth"
import { loadDefaultHeaders } from "@/lib/api"

export async function getProducts(params: Record<string, string> = {}) {
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
