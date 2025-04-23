"use server"

import { getRequest } from "@/lib/axios"
import { ApiError, PaginatedData, TSearchParams } from "@/types/default"
import { Car } from "@/types/models"
import { build } from "search-params"

export async function getCars(params: TSearchParams = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch cars")
  }
}

export async function getRentalCars(params: TSearchParams = { type: "rent" }) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch cars")
  }
}

export async function getBuyingCars(params: TSearchParams = { type: "sale" }) {
  try {
    const sp = build(params)
    const res = await getRequest<PaginatedData<Car>>(`/cars?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching cars:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch cars")
  }
}

export async function getCarById(carId: number, params: TSearchParams = {}) {
  try {
    const sp = build(params)
    const res = await getRequest<Car>(`/cars/${carId}?${sp}`)
    const data = res.data
    return data
  } catch (error) {
    console.error("Error fetching car:", error)
    const err = error as ApiError<{ data: { message: string } }>
    throw new Error(err?.data?.data?.message || "Failed to fetch car")
  }
}
