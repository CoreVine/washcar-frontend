import { z } from "zod"
import { LoginSchema } from "@/schema"
import { LucideIcon } from "lucide-react"

export type ApiResponse<T> = {
  data: T
  message: string
  status: number
  errors?: Record<string, string[]>
}

export type ApiError<T> = {
  message: string
  status: number
  data?: T
  errors?: Record<string, string[]>
}

export type Language = "ar" | "en" | "fr"

export type Timestamps = {
  created_at: Date
  updated_at: Date
  deleted_at: Date
}

type LoginData = z.infer<typeof LoginSchema>
