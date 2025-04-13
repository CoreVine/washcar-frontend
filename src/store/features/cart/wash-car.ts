import { create } from "zustand"
import { persist } from "zustand/middleware"

export type WashCarTypeCartItem = {
  type_id: number
  company_id: number
  name: string
  quantity: number
  totalPrice: number
  unitPrice: number
}

export type CartState = {
  types: WashCarTypeCartItem[]

  addCarWash: (item: WashCarTypeCartItem) => void
  removeCarWash: (id: number) => void
  updateCarWash: (id: number, quantity: number) => void
  emptyCarWash: () => void
}

export const useWashCarCartStore = create<CartState>()(
  persist(
    (set) => ({
      types: [],
      addCarWash: (item) => {
        set((state) => {
          const existingItem = state.types.find((i) => i.type_id === item.type_id)
          if (existingItem) {
            return {
              types: state.types.map((i) => (i.type_id === item.type_id ? { ...i, quantity: i.quantity + 1, totalPrice: i.totalPrice + item.unitPrice } : i))
            }
          }
          return {
            types: [...state.types, { ...item, quantity: 1 }]
          }
        })
      },
      removeCarWash: (id) => {
        set((state) => ({
          types: state.types.filter((item) => item.type_id !== id)
        }))
      },
      updateCarWash: (id, quantity) => {
        set((state) => ({
          types: state.types.map((item) => (item.type_id === id ? { ...item, quantity, totalPrice: item.unitPrice * quantity } : item))
        }))
      },
      emptyCarWash: () => {
        set(() => ({
          types: []
        }))
      }
    }),
    {
      name: "wash-type-storage"
    }
  )
)
