"use server"

import { getRequest } from "@/lib/axios"
import { cookies } from "next/headers"

import { LANGUAGE_COOKIE } from "@/lib/constants"
import { Ad } from "@/types/models"

export async function getLanguage(): Promise<string> {
  const language = (await cookies()).get(LANGUAGE_COOKIE)?.value
  return language || "en"
}

export async function getAds() {
  try {
    const res = await getRequest<{ data: Ad[] }>("/ads")
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching ads:", error)
    throw new Error("Failed to fetch ads")
  }
}
