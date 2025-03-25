"use server"

import { cookies } from "next/headers"
import { AUTH_COOKIE } from "@/lib/constants"

export async function getToken(): Promise<string | undefined> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  return token
}

export async function getUser() {
  try {
  } catch (err) {}
}
