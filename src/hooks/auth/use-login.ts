import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { ApiError, LoginData } from "@/types/default"
import { User } from "@/types/models"

import { AUTH_COOKIE } from "@/lib/constants"

import { showResponse } from "@/lib/utils"
import { postRequest } from "@/lib/axios"
import { setCookie } from "cookies-next/client"
import { toast } from "react-toastify"

import routes from "@/lib/route"

export function useLogin() {
  type Response = {
    token: string
    user: User
  }

  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginData) => postRequest<Response>("/login", data),
    onSuccess: (data) =>
      showResponse(data, () => {
        if (data.status === 200) {
          setCookie(AUTH_COOKIE, data.data.token)
          router.push(routes.home)
        }
      }),
    onError: (error: ApiError<any>) => {
      toast.error(error.message)
      console.error("API Error:", error.message)
    }
  })
}
