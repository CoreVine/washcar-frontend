"use server"

import { ApiError, LoginData, RegisterData, TAccountType } from "@/types/default"
import { SuccessfulLoginResponse } from "@/types/response"
import { User } from "@/types/models"

import { AUTH_COOKIE } from "@/lib/constants"

import { getRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function getToken(): Promise<string | undefined> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  return token
}

export async function getUser() {
  try {
    const token = await getToken()
    const response = await getRequest("/auth/me", loadDefaultHeaders(token))
    const data = response.data as User
    return data
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function logoutAction() {
  try {
    const store = await cookies()
    store.delete(AUTH_COOKIE)
    return true
  } catch (error) {
    return false
  }
}

export async function loginAction(credentials: LoginData, accountType: TAccountType = "user") {
  try {
    const requestData = {
      email: credentials.email,
      password: credentials.password,
      accountType
    }

    const res = await postRequest("/auth/login", requestData)
    const data = res.data as SuccessfulLoginResponse
    const store = await cookies()

    store.set(AUTH_COOKIE, data.token)

    return {
      data,
      status: res.status
    }
  } catch (error) {
    const e = error as ApiError<{ data: { message: string; status: number } }>
    throw new Error(e.data?.data?.message || "Login failed")
  }
}

export async function registerAction(credentials: RegisterData, accountType: TAccountType = "user") {
  try {
    const requestData = {
      ...credentials,
      accountType
    }

    const res = await postRequest("/auth/register", requestData)
    const data = res.data as SuccessfulLoginResponse
    const store = await cookies()

    store.set(AUTH_COOKIE, data.token)

    return {
      data,
      status: res.status
    }
  } catch (error) {
    const e = error as ApiError<{ data: { message: string; status: number } }>
    throw new Error(e.data?.data?.message || "Registeration failed")
  }
}
