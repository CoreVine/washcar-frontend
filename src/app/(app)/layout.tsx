import MobileAppNavbar from "@/components/app/navbar/mobile-navbar"
import AppNavbar from "@/components/app/navbar/navbar"
import { Footer } from "@/components/common/footer"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNavbar />
      <MobileAppNavbar />
      {children}
      <Footer />
    </div>
  )
}
