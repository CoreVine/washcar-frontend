"use server"

import { ApiError, ApiResponse, LoginData, LoginResponse, RegisterData, TAccountType } from "@/types/default"
import { SuccessfulLoginResponse } from "@/types/response"
import { Employee, User } from "@/types/models"

import { API_URL, AUTH_COOKIE } from "@/lib/constants"

import { getRequest, postRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { cookies } from "next/headers"
import { cache } from "react"

export async function getToken(): Promise<string | undefined> {
  const token = (await cookies()).get(AUTH_COOKIE)?.value
  return token
}

export const getUser = cache(async () => {
  try {
    const token = await getToken()
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: loadDefaultHeaders(token)
    })
    type TMut = ApiResponse<LoginResponse>
    const data = (await response.json()) as TMut
    return data?.data
  } catch (err) {
    console.log(err)
    return null
  }
})

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

    const res = await postRequest<SuccessfulLoginResponse>("/auth/login", requestData)
    const data = res.data
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

export async function sendResetPasswordLinkAction(email: string) {
  try {
    const res = await postRequest<{ email: string; expiresAt: string }>("/auth/password/request", {
      email,
      accountType: "user"
    })
    const store = await cookies()
    store.set("email-reset", email, {
      expires: new Date(res.data.expiresAt)
    })
    return res.data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string; status: number } }>
    throw new Error(e.data?.data?.message || "Registeration failed")
  }
}

export async function verifyPasswordTokenAction(code: string) {
  console.log({ code })
  try {
    const store = await cookies()
    const email = store.get("email-reset")?.value
    if (!email) throw new Error("Email not found")

    const res = await postRequest<{
      email: string
      verified: boolean
      expiresAt: string
      resetToken: string
    }>("/auth/password/verify", {
      email,
      code,
      accountType: "user"
    })

    const data = res.data

    store.set("reset-token", data.resetToken, {
      expires: new Date(data.expiresAt)
    })

    return data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string; status: number } }>
    console.log(e)
    throw new Error(e.data?.data?.message || "Registeration failed")
  }
}

export async function resetPasswordAction(password: string) {
  try {
    const store = await cookies()
    const res = await postRequest<{
      email: string
      verified: boolean
      expiresAt: string
      resetToken: string
    }>("/auth/password/reset", {
      email: store.get("email-reset")?.value,
      password,
      resetToken: store.get("reset-token")?.value,
      accountType: "user"
    })
    store.delete("email-reset")
    store.delete("reset-token")
    const data = res.data

    return data
  } catch (error) {
    const e = error as ApiError<{ data: { message: string; status: number } }>
    throw new Error(e.data?.data?.message || "Registeration failed")
  }
}
