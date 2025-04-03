import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  id: string
  name: string
  unitPrice: number
  quantity: number
  totalPrice: number
}

export type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, quantity: number) => void
  emptyCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return {
              items: [...state.items, { ...item, totalPrice: item.unitPrice * item.quantity }]
            }
          }
          return { state }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id)
        })),

      updateItem: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(0, quantity),
                  totalPrice: item.unitPrice * Math.max(0, quantity)
                }
              : item
          )
        })),

      emptyCart: () => set({ items: [] })
    }),
    {
      name: "cart-storage"
    }
  )
)
