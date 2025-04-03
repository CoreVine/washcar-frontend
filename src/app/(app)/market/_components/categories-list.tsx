import Image from "next/image"

const categories = [
  "/defaults/market/01.png",
  "/defaults/market/02.png",
  "/defaults/market/03.png",
  "/defaults/market/04.png",
  "/defaults/market/05.png",
  "/defaults/market/01.png",
  "/defaults/market/02.png",
  "/defaults/market/03.png",
  "/defaults/market/04.png",
  "/defaults/market/05.png"
]

const MarketCategoriesList = () => {
  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      {categories.map((image, i) => (
        <div
          key={i}
          className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'
        >
          <Image src={image} width={60} height={60} alt='Image of category' />
        </div>
      ))}
    </div>
  )
}

export default MarketCategoriesList
