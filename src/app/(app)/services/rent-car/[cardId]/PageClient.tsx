"use client"
import { useState } from "react"
import RentCarSearch from "../_components/search"
import RentCarCategoriesList from "../_components/categories-list"
import RentCarProductsList from "../_components/products-list"
export default function Page() {

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null)

  return (
    <div className='my-10'>
      <section className='space-y-8'>
        <RentCarSearch />
        <RentCarCategoriesList onBrandSelect={setSelectedBrandId} />
        <RentCarProductsList selectedBrandId={selectedBrandId} />
      </section>
    </div>
  )
}