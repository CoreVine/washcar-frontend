import AppNavbar from "@/components/app/navbar/navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppNavbar />
      {children}
    </div>
  )
}
