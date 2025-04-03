import MarketDetailsLeftSide from "../_components/details/left-side"
import MarketDetailsRightSide from "../_components/details/right-side"

export default function MarketDetailsPage() {
  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row'>
      <MarketDetailsLeftSide />
      <MarketDetailsRightSide />
    </div>
  )
}
