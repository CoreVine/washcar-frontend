"use server"

import { LANGUAGE_COOKIE } from "@/lib/constants"
import { cookies } from "next/headers"

export async function getLanguage(): Promise<string> {
  const language = (await cookies()).get(LANGUAGE_COOKIE)?.value
  return language || "en"
}
