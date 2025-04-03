import { z } from "zod"
import { LoginSchema, RegisterSchema } from "@/schema/auth"
import { LucideIcon } from "lucide-react"

export type ApiResponse<T> = {
  data: T
  message: string
  status: number
}

export type ApiError<T> = {
  message: string
  status: number
  data: T
}

export type TLanguage = "ar" | "en"
export type TAccountType = "admin" | "user" | "company"

export type Timestamps = {
  created_at: Date
  updated_at: Date
}

export type LoginData = z.infer<typeof LoginSchema>
export type RegisterData = z.infer<typeof RegisterSchema>
