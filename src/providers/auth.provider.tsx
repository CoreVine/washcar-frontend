"use client"

import { User } from "@/types/models"
import { createContext } from "react"

export const UserContext = createContext<User | null>(null)

type AuthProviderProps = {
  value: User | null
  children: React.ReactNode
}

export const AuthProvider = ({ value, children }: AuthProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
