"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { deleteRequest, getRequest } from "@/lib/axios"
import { getToken } from "./auth"
import { build } from "search-params"

import { ApiError, ApiErrorData, ApiResponse, PaginatedData, TSearchParams } from "@/types/default"
import { User } from "@/types/models"
import axios from "axios"
import { API_URL } from "@/lib/constants"

export async function getPaginatedUsers(searchParams: TSearchParams) {
  try {
    const token = await getToken()
    const sp = build(searchParams)
    const response = await getRequest<PaginatedData<User>>(`/user/paginated?${sp}`, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<ApiErrorData>
    throw new Error(err?.data?.data?.message || "Failed to fetch users")
  }
}

export async function getSingleUser(userId: number) {
  try {
    const token = await getToken()
    const response = await getRequest<User>(`/users/${userId}`, loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<ApiErrorData>
    throw new Error(err?.data?.data?.message || "Failed to fetch single user")
  }
}

export async function deleteUserAction(userId: number, reason: string, confirm: boolean) {
  try {
    const token = await getToken()
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      data: {
        reason,
        confirm
      },
      headers: loadDefaultHeaders(token)
    })
    const data = response.data as ApiResponse<User>
    return data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<ApiErrorData>
    throw new Error(err?.data?.data?.message || "Failed to delete user")
  }
}
