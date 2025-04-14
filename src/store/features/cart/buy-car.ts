import { create } from "zustand"
import { persist } from "zustand/middleware"

export type BuyCarCartItem = {
  car_id: number
  make: string
  model: string
  quantity: number
  totalPrice: number
  unitPrice: number
  image_url: string
}

export type CartState = {
  cars: BuyCarCartItem[]
  addCar: (item: BuyCarCartItem) => void
  removeCar: (id: number) => void
  updateCar: (id: number, quantity: number) => void
  emptyCar: () => void
}

export const useBuyCarCartStore = create<CartState>()(
  persist(
    (set) => ({
      cars: [],
      addCar: (item) => {
        set((state) => {
          const existingItem = state.cars.find((i) => i.car_id === item.car_id)
          if (existingItem) {
            return {
              cars: state.cars.map((i) => 
                i.car_id === item.car_id 
                  ? { ...i, quantity: i.quantity + 1, totalPrice: i.totalPrice + item.unitPrice } 
                  : i
              )
            }
          }
          return {
            cars: [...state.cars, { ...item, quantity: 1 }]
          }
        })
      },
      removeCar: (id) => {
        set((state) => ({
          cars: state.cars.filter((item) => item.car_id !== id)
        }))
      },
      updateCar: (id, quantity) => {
        set((state) => ({
          cars: state.cars.map((item) => 
            item.car_id === id 
              ? { ...item, quantity, totalPrice: item.unitPrice * quantity } 
              : item
          )
        }))
      },
      emptyCar: () => {
        set(() => ({
          cars: []
        }))
      }
    }),
    {
      name: "buy-car-storage"
    }
  )
) 