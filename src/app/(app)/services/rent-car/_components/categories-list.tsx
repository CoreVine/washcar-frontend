import Image from "next/image"

const RentCarCategoriesList = () => {
  return (
    <div className='max-w-7xl flex flex-wrap gap-6 mx-auto justify-center px-4'>
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className='bg-main-gray p-4 rounded-xl flex justify-center items-center size-20'
        >
          <Image src='/defaults/nissan.png' alt='Nissan' width={60} height={60} />
        </div>
      ))}
    </div>
  )
}

export default RentCarCategoriesList
