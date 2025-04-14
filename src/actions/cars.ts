"use server"

import { getRequest, postRequest } from "@/lib/axios"
import { ApiError, PaginatedData } from "@/types/default"
import { Car } from "@/types/models"
import { build } from "search-params"

// Fetch all cars with filtering options
export async function getCars(params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    // Based on the Postman collection endpoint: GET /cars
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    throw new Error("Failed to fetch cars")
  }
}

// Fetch a single car by ID
export async function getCarById(carId: number, params: Record<string, string> = {}) {
  try {
    const sp = build(params)
    // Based on the Postman collection endpoint: GET /cars/:carId
    const res = await getRequest<Car>(`/cars/${carId}?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    const err = error as ApiError<any>
    return undefined
  }
}

// Add a car to the order
export async function addCarToOrder(carId: number) {
  try {
    // Based on the Postman collection endpoint for creating an order
    // This would typically be a POST request to /orders with the car ID
    const res = await postRequest<{ success: boolean }>('/orders', {
      order_type: "buy_car",
      items: [{ car_id: carId, quantity: 1 }]
    })
    return res.data
  } catch (error) {
    console.error("Error adding car to order:", error)
    throw new Error("Failed to add car to order")
  }
} 