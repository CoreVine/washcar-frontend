import CartDetailsLeftSide from "./_components/left-side"
import CartDetailsRightSide from "./_components/right-side"

export default function CartDetailsPage() {
  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row py-20'>
      <CartDetailsLeftSide />
      <CartDetailsRightSide />
    </div>
  )
}
