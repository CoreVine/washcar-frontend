import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function DeleteCompanyModal() {
  return <Button icon={Trash} variant='outline-destructive' className='rounded-full size-10' />
}
