import { z } from "zod"

export const ProductSchema = z.object({
  name: z.string().min(3, "Invalid product name"),
  description: z.string().min(3, "Invalid product description"),
  price: z.coerce.number().min(0),
  stock: z.number().min(1, "messages.invalidQuantity"),
  subCategoriesIds: z.array(z.number())
})
