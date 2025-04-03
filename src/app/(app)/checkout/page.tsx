import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import CheckoutOrderSummary from "./_components/order-summary"
import CheckoutPaymentMethod from "./_components/payment-method"
import CheckoutFormDetails from "./_components/form-details"

export default async function PaymentForm() {
  const t = await getTranslations()

  return (
    <div className='max-w-md mx-auto p-6 py-14'>
      <div className='space-y-6'>
        <CheckoutFormDetails />

        <CheckoutPaymentMethod />

        <div className='flex items-center space-x-2'>
          <Checkbox
            id='acknowledge'
            className='bg-blue-500 text-white border-none'
            defaultChecked
          />
          <label htmlFor='acknowledge' className='text-sm text-gray-600'>
            {t("Iacknowledge")}
          </label>
        </div>

        <CheckoutOrderSummary />

        <div className='grid grid-cols-2 gap-4 pt-4'>
          <Button
            variant='outline'
            className='bg-gray-100 hover:bg-gray-200 border-none rounded-full'
          >
            {t("cancel")}
          </Button>
          <Button className='bg-blue-500 hover:bg-blue-600 rounded-full'>{t("payNow")}</Button>
        </div>
      </div>
    </div>
  )
}
