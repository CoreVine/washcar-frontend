"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import { ClassValue } from "class-variance-authority/types"
import { cn } from "@/lib/utils"

type Props = {
  className?: ClassValue
  hasNextPage?: boolean
  hasPrevPage?: boolean
}

export const SimplePagination = ({ className, hasNextPage, hasPrevPage }: Props) => {
  const sp = useSearchParams()
  const router = useRouter()

  const page = sp.get("page") || 1

  const onNext = () => {
    const currentPage = parseInt(page as string)
    const nextPage = currentPage + 1
    router.push(`?page=${nextPage}`)
  }

  const onPrev = () => {
    const currentPage = parseInt(page as string)
    const prevPage = currentPage - 1 == 0 ? 0 : currentPage - 1
    router.push(`?page=${prevPage}`)
  }

  return (
    <div className={cn("flex gap-2 items-center justify-center", className)}>
      <Button disabled={hasNextPage} variant='outline' size='icon' icon={ArrowLeft} onClick={onPrev} />
      <Button disabled={hasPrevPage} variant='outline' size='icon' icon={ArrowRight} onClick={onNext} />
    </div>
  )
}
