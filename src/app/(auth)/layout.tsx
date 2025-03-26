import AppNavbar from "@/components/app/navbar/navbar"
import React from "react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  )
}
