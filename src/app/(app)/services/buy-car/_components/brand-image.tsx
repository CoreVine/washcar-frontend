"use client"

import { useState } from "react"
import Image from "next/image"

type BrandImageProps = {
  brandLogo: string
  brandName: string
}

export default function BrandImage({ brandLogo, brandName }: BrandImageProps) {
  const [error, setError] = useState(false);
  
  // The default Nissan image for placeholder
  const fallbackImage = "/defaults/nissan.png";
  
  return (
    <Image
      src={error ? fallbackImage : brandLogo}
      alt={brandName}
      width={60}
      height={40}
      className="object-contain"
      onError={() => setError(true)}
    />
  );
} 