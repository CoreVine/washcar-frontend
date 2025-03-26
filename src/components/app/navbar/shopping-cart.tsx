import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"

export default function NavbarShoppingCartDrawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className='bg-main-gray text-black' variant='secondary' size='icon'>
          <ShoppingCart size={16} fill='black' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
