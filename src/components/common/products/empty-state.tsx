import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function EmptyProductState() {
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='text-center pb-4'>
        <div className='w-12 h-12 bg-muted rounded-full mx-auto flex items-center justify-center mb-4'>
          <Package className='h-6 w-6 text-muted-foreground' />
        </div>
        <CardTitle className='text-xl'>No products found</CardTitle>
        <CardDescription>You haven't added any products to your inventory yet.</CardDescription>
      </CardHeader>
      <CardContent className='text-center text-sm text-muted-foreground pb-6'>
        <p>Get started by adding your first product. You can add product details, pricing, inventory levels, and images.</p>
      </CardContent>
      <CardFooter className='flex justify-center pb-6'>
        <Button>Add your first product</Button>
      </CardFooter>
    </Card>
  )
}
