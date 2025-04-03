import RentCarDetailsLeftSide from "../_components/details/left-side"
import RentCarDetailsRightSide from "../_components/details/right-side"

export default function CarRentalBooking() {
  return (
    <div className='xl:max-w-7xl mx-auto bg-white min-h-screen flex flex-col xl:flex-row'>
      <RentCarDetailsLeftSide />
      <RentCarDetailsRightSide />
    </div>
  )
}
