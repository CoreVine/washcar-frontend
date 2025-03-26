import AppNavbar from "@/components/app/navbar/navbar"
import React from "react"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  )
}
