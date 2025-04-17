import { z } from "zod"

export const ProductSchema = z.object({
  name: z.string().min(3, "messages.invalidProductName"),
  description: z.string().min(3, "messages.invalidDescription"),
  price: z.string().nonempty("messages.invalidPrice"),
  stock: z.number().min(1, "messages.invalidQuantity"),
  subCategoriesIds: z.array(z.number())
})
