"use client"

import { Fragment, useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"

import { Product } from "@/types/models"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/common/loading-button"

import { addProductToCart, removeProductFromCart, updateProductInCart } from "@/actions/cart"

import { useCart } from "@/hooks/data/use-cart"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketDetailsRightSide({ product }: { product: Product }) {
  const t = useTranslations()

  const { cart, isCartFetched, isCartLoading } = useCart()

  const added = cart?.orderItems.find((item) => item.product_id === product.product_id)

  const [isAdded, setIsAdded] = useState(!!added)
  const [qty, setQty] = useState(added?.quantity ?? 1)
  const [total, setTotal] = useState(+product.price)

  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => addProductToCart(productId, quantity),
    onSuccess: () => {
      toast.success(t("added"))
      setIsAdded(true)
    },
    onError: (error: any) => toast.error(error?.message || t("failed"))
  })

  const removeMutation = useMutation({
    mutationFn: (productId: number) => removeProductFromCart(productId),
    onSuccess: () => {
      toast.success(t("removed"))
      setIsAdded(false)
    },
    onError: (error: any) => toast.error(error?.message || t("failed"))
  })

  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => updateProductInCart(productId, quantity),
    onSuccess: () => toast.success(t("updated")),
    onError: (error: any) => toast.error(error?.message || t("failed"))
  })

  const handleAddToCart = () => {
    addMutation.mutate({ productId: product.product_id, quantity: qty })
  }

  const handleRemoveFromCart = () => {
    removeMutation.mutate(Number(added?.order_item_id))
  }

  const handleIncrease = () => {
    const newQty = qty + 1
    setQty(newQty)

    if (added) {
      updateMutation.mutate({ productId: product.product_id, quantity: newQty })
    } else {
      addMutation.mutate({ productId: product.product_id, quantity: 2 })
      setQty(2)
    }
  }

  const handleDecrease = () => {
    if (qty === 1) return

    const newQty = qty - 1
    setQty(newQty)

    if (added) {
      updateMutation.mutate({ productId: product.product_id, quantity: newQty })
    }
  }

  useEffect(() => {
    setTotal(+product.price * qty)
  }, [qty, product.price])

  useEffect(() => {
    if (added) setQty(added.quantity)
    setIsAdded(!!added)
  }, [isCartFetched])

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex xl:flex-row flex-col xl:items-center gap-2'>
            <LoadingButton loading={updateMutation.isPending} onClick={handleIncrease} icon={Plus} className='size-7 rounded-4xl px-6' />
            {isCartLoading ? <Skeleton className='w-4 h-4' /> : <p>{qty}</p>}
            <LoadingButton loading={updateMutation.isPending} onClick={handleDecrease} variant='secondary' className='bg-main-gray text-main-black px-6 size-7 rounded-4xl' icon={Minus} />
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("quantity")}</p>
          {isCartLoading ? <Skeleton className='w-10 h-4' /> : <p className='font-medium'>x{qty}</p>}
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("itemPrice")}</p>

          <p className='font-medium'>{product.price} KWD</p>
        </div>

        <div className='border-t border-dashed border-t-main-gray pt-4' />

        <div className='flex justify-between items-center'>
          <p className='font-medium'>{t("total")}</p>
          {isCartLoading ? <Skeleton className='w-10 h-4' /> : <p className='font-medium'>{total.toFixed(2)} KWD</p>}
        </div>
      </div>

      {isCartLoading ? (
        <Skeleton className='w-full h-14 rounded-full' />
      ) : (
        <Fragment>
          {isAdded ? (
            <LoadingButton loading={removeMutation.isPending} onClick={handleRemoveFromCart} className='w-full h-14 rounded-full bg-red-500 hover:bg-red-600 text-white text-lg'>
              {t("removeFromCart")}
            </LoadingButton>
          ) : (
            <LoadingButton loading={addMutation.isPending} onClick={handleAddToCart} className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
              {t("addToCart")}
            </LoadingButton>
          )}
        </Fragment>
      )}
    </div>
  )
}
