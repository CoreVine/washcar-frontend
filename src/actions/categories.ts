"use server"

import { getRequest, postRequest } from "@/lib/axios"
import { ApiError, PaginatedData } from "@/types/default"
import { Category, Product, SubCategory } from "@/types/models"
import { getToken } from "./auth"
import { loadDefaultHeaders } from "@/lib/api"

export async function getCategories() {
  try {
    const res = await getRequest<{ data: Category[] }>("/categories")
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch categories")
  }
}

export async function getCategory(id: number) {
  try {
    const res = await getRequest<{ data: Category }>(`/categories/${id}`)
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching category:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch category")
  }
}

export async function getCategorySubCategories(id: number) {
  try {
    const res = await getRequest<PaginatedData<SubCategory>>(`/categories/${id}/subcategories`)
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching car:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch sub categories")
  }
}

export async function getCategoryProducts(id: number) {
  try {
    const res = await getRequest<PaginatedData<Product>>(`/products?category=${id}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching car:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch category products")
  }
}

export async function createCategoryAction(data: FormData) {
  try {
    const token = await getToken()
    const res = await postRequest("/categories", data, loadDefaultHeaders(token))
  } catch (error: any) {
    console.error("Error creating category:", error)
    const data = error as ApiError<{ data: { message: string; status: number } }>
    throw new Error(data?.data?.data?.message || "Failed to create category")
  }
}
