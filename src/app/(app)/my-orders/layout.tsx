import { MyOrdersPageHeader } from "./_components/header"
import { MyOrdersTabs } from "./_components/tabs"

export default function OrdersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='max-w-6xl mx-auto px-4 py-6'>
      <MyOrdersTabs />
      {children}
    </div>
  )
}
