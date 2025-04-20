"use client"

import { useCart } from "@/hooks/data/use-cart"

import { ProductAlreadyAdded } from "./already-added"
import { ProductNotAdded } from "./not-added"
import { Product } from "@/types/models"

export default function MarketDetailsRightSide({ isAdded, product }: { isAdded: boolean; product: Product }) {
  if (isAdded) return <ProductAlreadyAdded product={product} />

  return <ProductNotAdded product={product} />
}
