import Image from "next/image"
import Link from "next/link"

type Props = {
  id: number
  image: string
  title: string
  subtitle: string
  url: string
}

export function CarCard({ id, title, subtitle, image, url }: Props) {
  return (
    <Link href={url} className='bg-main-gray rounded-xl text-center overflow-hidden flex flex-col justify-between '>
      <div className='flex justify-center items-center py-10'>
        <Image className='w-36 h-20 object-contain mx-auto' src={`/defaults/nissan.png`} width={1000} height={1000} alt='Image' />
      </div>
      <div className='flex justify-between bg-light-blue p-4 py-4'>
        <p className='truncate max-w-44'>{title}</p>
        <p className='text-primary font-medium'>{subtitle}</p>
      </div>
    </Link>
  )
}
