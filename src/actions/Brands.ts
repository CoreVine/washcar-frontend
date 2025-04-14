"use server"

import { getRequest } from "@/lib/axios"
import { Brands } from "@/types/models"

export async function getBrands() {
  try {
    const res = await getRequest<{ data: Brands[] }>("/brands")
    const data = res.data.data
    return data
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw new Error("Failed to fetch categories")
  }
}