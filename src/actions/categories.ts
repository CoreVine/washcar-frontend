"use server"

import { getRequest } from "@/lib/axios"
import { Category } from "@/types/models"

export async function getCategories() {
  try {
    const res = await getRequest<{ data: Category[] }>("/categories")
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}

export async function getCategory(id: number) {
  try {
    const res = await getRequest<{ data: Category }>(`/categories/${id}`)
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching category:", error)
    throw new Error("Failed to fetch category")
  }
}
