import { create } from "zustand"

export type WashCarTypeCartItem = {
  typeId: number
  companyId: number
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

export const useWashCarCartStore = create<CartState>()((set) => ({
  types: [],
  addCarWash: (item) => {
    set((state) => {
      const existingItem = state.types.find((i) => i.typeId === item.typeId)
      if (existingItem) {
        return {
          types: state.types.map((i) => (i.typeId === item.typeId ? { ...i, quantity: i.quantity + 1, totalPrice: i.totalPrice + item.unitPrice } : i))
        }
      }
      return {
        types: [...state.types, { ...item, quantity: 1 }]
      }
    })
  },
  removeCarWash: (id) => {
    set((state) => ({
      types: state.types.filter((item) => item.typeId !== id)
    }))
  },
  updateCarWash: (id, quantity) => {
    set((state) => ({
      types: state.types.map((item) => (item.typeId === id ? { ...item, quantity, totalPrice: item.unitPrice * quantity } : item))
    }))
  },
  emptyCarWash: () => {
    set(() => ({
      types: []
    }))
  }
}))
