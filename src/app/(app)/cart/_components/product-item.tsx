import { removeProductFromCart, updateProductInCart } from "@/actions/cart"
import { LoadingButton } from "@/components/common/loading-button"
import { useCart } from "@/hooks/data/use-cart"
import { Product } from "@/types/models"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Minus, Plus, XIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import Image from "next/image"
import { useState } from "react"
import { toast } from "react-toastify"

type Props = { product: Product; itemId: number; initialQty: number; orderItem: number }

export const ProductItem = ({ product, itemId, orderItem, initialQty = 1 }: Props) => {
  const t = useTranslations()

  const [added, setIsAdded] = useState(true)
  const [qty, setQty] = useState(initialQty)

  const { refetchCart } = useCart()
  const qc = useQueryClient()

  const removeMutation = useMutation({
    mutationFn: (productId: number) => removeProductFromCart(productId),
    onSuccess: () => {
      toast.success(t("removed"))
      qc.invalidateQueries({ queryKey: ["cart"] })
      setIsAdded(false)
      refetchCart()
    },
    onError: (error: any) => toast.error(error?.message || t("failed"))
  })

  const updateMutation = useMutation({
    mutationFn: ({ orderItemId, quantity }: { orderItemId: number; quantity: number }) => updateProductInCart(orderItemId, quantity),
    onSuccess: () => toast.success(t("updated")),
    onError: (error: any) => toast.error(error?.message || t("failed"))
  })

  const handleIncrease = () => {
    const newQty = qty + 1
    setQty(newQty)

    if (added) {
      updateMutation.mutate({ orderItemId: orderItem, quantity: newQty })
    }
  }

  const handleDecrease = () => {
    if (qty === 1) return
    const newQty = qty - 1
    setQty(newQty)

    if (added) {
      updateMutation.mutate({ orderItemId: orderItem, quantity: newQty })
    }
  }

  const handleRemove = () => {
    removeMutation.mutate(Number(itemId))
  }

  if (!added) return null

  return (
    <div className='flex items-center gap-4 py-4 relative'>
      <div className='bg-gray-100 p-2 rounded-lg'>
        <Image src={product?.images?.[0]?.image_url || "/defaults/nissan.png"} alt='Nissan NV200' width={80} height={80} className='object-contain size-20 rounded-md' />
      </div>
      <div className='flex-1'>
        <h2 className='text-lg font-medium'>{product?.product_name}</h2>
      </div>
      <div className='text-right'>
        <p className='font-medium'>{(+product.price * qty).toFixed(2)}KWD</p>
      </div>
      <div className='absolute top-2 right-0 flex xl:flex-row flex-col xl:items-center gap-2'>
        <LoadingButton loading={updateMutation.isPending} onClick={handleIncrease} icon={Plus} className='size-7 rounded-4xl px-6' />
        <p>{qty}</p>
        <LoadingButton loading={updateMutation.isPending} onClick={handleDecrease} variant='secondary' className='bg-main-gray text-main-black px-6 size-7 rounded-4xl' icon={Minus} />
      </div>
      <LoadingButton loading={removeMutation.isPending} onClick={handleRemove} icon={XIcon} variant='outline' className='bg-main-gray text-main-black rounded-full size-7 absolute bottom-2 right-0 hover:bg-gray-100 hover:text-red-500 cursor-pointer' />
    </div>
  )
}
