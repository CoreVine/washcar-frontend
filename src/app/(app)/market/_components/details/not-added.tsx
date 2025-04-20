"use client"

import { Fragment, useEffect, useState } from "react"
import { Minus, Plus } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useTranslations } from "next-intl"

import { Product } from "@/types/models"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/common/loading-button"

import { addProductToCart, removeProductFromCart, updateProductInCart } from "@/actions/cart"

import { useCart } from "@/hooks/data/use-cart"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/hooks/auth/use-user"
import { LoginAlert } from "@/components/common/login-alert"
import { useRouter } from "next/navigation"

type Props = {
  product: Product
}

export const ProductNotAdded = ({ product }: Props) => {
  const t = useTranslations()

  const { cart, isCartFetched, isCartLoading } = useCart()

  const user = useUser()

  const [isAdded, setIsAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const [total, setTotal] = useState(+product.price)

  const qc = useQueryClient()
  const router = useRouter()

  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => addProductToCart(productId, quantity),
    onSuccess: () => {
      toast.success(t("added"))
      qc.invalidateQueries({ queryKey: ["cart"] })
      router.refresh()
      setIsAdded(true)
    },
    onError: (error: any) => toast.error(error?.message || t("failed"))
  })

  const handleAddToCart = () => {
    addMutation.mutate({ productId: product.product_id, quantity: 1 })
  }

  const handleIncrease = () => {
    addMutation.mutate({ productId: product.product_id, quantity: 2 })
  }

  useEffect(() => {
    setTotal(+product.price * qty)
  }, [qty, product.price])

  return (
    <div className='xl:w-1/2 p-6 space-y-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <div className='flex xl:flex-row flex-col xl:items-center gap-2'>
            <LoadingButton onClick={handleIncrease} loading={addMutation.isPending} icon={Plus} className='size-7 rounded-4xl px-6' />
            <p>{qty}</p>
            <LoadingButton variant='secondary' className='bg-main-gray text-main-black px-6 size-7 rounded-4xl' icon={Minus} />
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("quantity")}</p>
          <p className='font-medium'>x{qty}</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className='text-gray-600'>{t("itemPrice")}</p>

          <p className='font-medium'>{product.price} KWD</p>
        </div>

        <div className='border-t border-dashed border-t-main-gray pt-4' />

        <div className='flex justify-between items-center'>
          <p className='font-medium'>{t("total")}</p>
          <p className='font-medium'>{total.toFixed(2)} KWD</p>
        </div>
      </div>

      <Fragment>
        {user?.user ? (
          <LoadingButton loading={addMutation.isPending} onClick={handleAddToCart} className='w-full h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-lg'>
            {t("addToCart")}
          </LoadingButton>
        ) : (
          <LoginAlert />
        )}
      </Fragment>
    </div>
  )
}
