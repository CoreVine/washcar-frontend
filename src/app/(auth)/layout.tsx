import { Footer } from "@/components/common/footer"

import MobileAppNavbar from "@/components/app/navbar/mobile-navbar"
import AppNavbar from "@/components/app/navbar/navbar"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MobileAppNavbar />
      <AppNavbar />
      {children}
      <Footer />
    </div>
  )
}
